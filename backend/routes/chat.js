const express = require('express');
const router = express.Router();
const fetch = global.fetch || require('node-fetch');

const GEMINI_URL = process.env.GEMINI_API_URL;
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const DEEPSEEK_URL = process.env.DEEPSEEK_API_URL;
const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY;
const HF_KEY = process.env.HF_API_KEY;
const HF_MODEL = process.env.HF_TEXT_MODEL || 'gpt2';

async function callGemini(message) {
  if (!GEMINI_URL || !GEMINI_KEY) throw new Error('Gemini not configured');
  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GEMINI_KEY}`
    },
    body: JSON.stringify({
      prompt: message,
      max_tokens: 200,
      temperature: 0.7
    })
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Gemini error ${res.status}: ${txt}`);
  }
  return res.json();
}

async function callHuggingFace(message) {
  if (!HF_KEY) throw new Error('HuggingFace not configured');
  const res = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${HF_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inputs: message,
      parameters: { max_new_tokens: 128, temperature: 0.7 }
    })
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HF error ${res.status}: ${txt}`);
  }
  return res.json();
}

async function callDeepSeekSuggestions(message) {
  if (!DEEPSEEK_URL || !DEEPSEEK_KEY) return [];
  try {
    const res = await fetch(DEEPSEEK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DEEPSEEK_KEY}`
      },
      body: JSON.stringify({ query: message, size: 3 })
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data)) return data.slice(0, 3).map(d => d.title || d.text || JSON.stringify(d));
    if (data.results) return data.results.slice(0, 3).map(r => r.title || r.snippet || JSON.stringify(r));
  } catch (e) {
    console.warn('DeepSeek suggestion fail', e.message);
  }
  return [];
}

router.post('/', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'message is required' });

  try {
    if (GEMINI_URL && GEMINI_KEY) {
      try {
        const gemResp = await callGemini(message);
        const text = gemResp?.output ?? gemResp?.text ?? JSON.stringify(gemResp);
        const suggestions = await callDeepSeekSuggestions(message);
        return res.json({ reply: String(text), source: 'gemini', suggestions });
      } catch (gErr) {
        console.warn('Gemini failed:', gErr.message);
      }
    }

    if (HF_KEY) {
      try {
        const hfResp = await callHuggingFace(message);
        let reply = '';
        if (Array.isArray(hfResp) && hfResp[0]?.generated_text) reply = hfResp[0].generated_text;
        else if (hfResp.generated_text) reply = hfResp.generated_text;
        else reply = JSON.stringify(hfResp).slice(0, 2000);
        const suggestions = await callDeepSeekSuggestions(message);
        return res.json({ reply, source: 'huggingface', suggestions });
      } catch (hfErr) {
        console.warn('HuggingFace failed:', hfErr.message);
      }
    }

    const canned = [
      "Ajoyib. Shu mavzu bo'yicha kichik mashq qilaylik.",
      "Yaxshi boshlovchisiz — davom eting, men takliflar beraman.",
      "Men sizga gap ochishda yordam beraman — biror misol keltiring."
    ];
    const reply = `${canned[Math.floor(Math.random() * canned.length)]} (${message.slice(0,120)})`;
    const suggestions = (await callDeepSeekSuggestions(message)).slice(0,3);
    return res.json({ reply, source: 'mock', suggestions });
  } catch (err) {
    console.error('Chat route error', err);
    return res.status(500).json({ error: 'internal_server_error', detail: err.message });
  }
});

module.exports = router;
