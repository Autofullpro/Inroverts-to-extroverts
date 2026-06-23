import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../components/Sidebar'
import MessageBubble from '../components/MessageBubble'
import VoiceButton from '../components/VoiceButton'
import { motion } from 'framer-motion'
import useSpeech from '../hooks/useSpeech'

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', text: "Salom! Menga gapirishni boshlang. Men sizga suhbatni davom ettirish uchun savollar va takliflar beraman." }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const containerRef = useRef(null)

  const { listening, startListening, stopListening, transcript, resetTranscript } = useSpeech({
    onResult: text => {
      setInput(prev => (prev ? prev + ' ' + text : text))
    }
  })

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, suggestions, loading])

  async function sendMessage(msg) {
    if (!msg) return
    const userMsg = { id: Date.now(), role: 'user', text: msg }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg })
      })
      const data = await resp.json()
      const aiMsg = { id: Date.now() + 1, role: 'ai', text: data.reply || '...' }
      setMessages(prev => [...prev, aiMsg])
      setSuggestions(data.suggestions || [])
    } catch (e) {
      setMessages(prev => [...prev, { id: Date.now()+2, role: 'ai', text: 'Xatolik yuz berdi. Iltimos yana urinib ko‘ring.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto h-[80vh] bg-white rounded-2xl glass card-shadow overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Chat Practice</h2>
              <p className="text-sm text-muted">AI bilan ravon gapirishni mashq qiling</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-green-600 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                Online AI
              </div>
            </div>
          </div>

          {/* Messages */}
          <div ref={containerRef} className="flex-1 p-6 overflow-y-auto space-y-4 bg-white">
            {messages.map(m => (
              <MessageBubble key={m.id} role={m.role} text={m.text} />
            ))}

            {loading && (
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-sky-400 flex items-center justify-center text-white font-bold">AI</div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="ml-3">
                  <div className="bg-slate-100 text-slate-800 px-4 py-2 rounded-xl">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" />
                      <div className="w-2 h-2 rounded-full bg-slate-300 animate-pulse delay-75" />
                      <div className="w-2 h-2 rounded-full bg-slate-200 animate-pulse delay-150" />
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          <div className="p-4 border-t border-slate-100 bg-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted">Takliflar</span>
              <span className="text-xs text-muted">AI</span>
            </div>
            <div className="flex gap-3">
              {suggestions.length ? suggestions.map((s, i) => (
                <button key={i} onClick={() => sendMessage(String(s))} className="btn-rounded glass px-3 py-2 bg-slate-100 hover:bg-slate-200 text-sm text-slate-800">
                  {s.length > 40 ? s.slice(0,40) + '…' : s}
                </button>
              )) : (
                <>
                  <button onClick={() => sendMessage('Menga suhbatni boshlash uchun savol bering')} className="btn-rounded glass px-3 py-2 bg-slate-100 hover:bg-slate-200 text-sm text-slate-800">Qanday gapni boshlash mumkin?</button>
                  <button onClick={() => sendMessage('Menga intervyu stsenariysi kerak')} className="btn-rounded glass px-3 py-2 bg-slate-100 hover:bg-slate-200 text-sm text-slate-800">Intervyu mashqi</button>
                </>
              )}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-100 flex items-center gap-3 bg-white">
            <VoiceButton
              listening={listening}
              onStart={() => { startListening(); }}
              onStop={() => { stopListening(); }}
            />

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(input) }}
              className="flex-1 bg-transparent outline-none px-4 py-3 text-slate-800 placeholder-slate-400 rounded-full glass"
              placeholder="Siz nima demoqchisiz? Enter bilan yuboring yoki mikrofonni bosing"
            />
            <button onClick={() => { sendMessage(input) }} className="btn-rounded bg-gradient-to-r from-indigo-500 to-sky-400 hover:scale-105 text-black">
              Yuborish
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
