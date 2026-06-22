import { useEffect, useRef, useState } from 'react'

export default function useSpeech({ onResult } = {}) {
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const recognitionRef = useRef(null)

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return
    const rec = new SpeechRecognition()
    rec.lang = 'uz-UZ'
    rec.interimResults = true
    rec.continuous = false

    rec.onresult = (evt) => {
      let text = Array.from(evt.results).map(r => r[0].transcript).join(' ')
      setTranscript(text)
      if (evt.results[0].isFinal) {
        onResult && onResult(text)
      }
    }

    rec.onerror = (e) => {
      console.warn('Speech error', e)
      setListening(false)
    }

    recognitionRef.current = rec
    return () => {
      try { rec.stop() } catch {}
    }
  }, [onResult])

  function startListening() {
    try {
      recognitionRef.current && recognitionRef.current.start()
      setListening(true)
    } catch (e) {
      console.warn('startListening failed', e)
    }
  }

  function stopListening() {
    try {
      recognitionRef.current && recognitionRef.current.stop()
    } catch (e) {}
    setListening(false)
  }

  function resetTranscript() {
    setTranscript('')
  }

  return { listening, startListening, stopListening, transcript, resetTranscript }
}
