import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import BigMic from '../components/BigMic'
import ProgressBar from '../components/ProgressBar'
import useSpeech from '../hooks/useSpeech'

export default function SpeakingPractice() {
  const [listening, setListening] = useState(false)
  const [timer, setTimer] = useState(30)
  const [running, setRunning] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [score, setScore] = useState(null)
  const [confidence, setConfidence] = useState(0)
  const timerRef = useRef(null)

  const { startListening, stopListening, listening: speechListening, transcript: liveTranscript } = useSpeech({
    onResult: (text) => {
      setTranscript(prev => prev ? prev + ' ' + text : text)
    }
  })

  useEffect(() => {
    if (speechListening) setListening(true)
    else setListening(false)
  }, [speechListening])

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setTimer(t => {
          if (t <= 1) {
            clearInterval(timerRef.current)
            handleStop()
            return 0
          }
          return t - 1
        })
      }, 1000)
    }
    return () => clearInterval(timerRef.current)
  }, [running])

  function handleStart() {
    setTranscript('')
    setScore(null)
    setConfidence(0)
    setTimer(30)
    setRunning(true)
    startListening()
  }

  function handleStop() {
    setRunning(false)
    stopListening()
    // Mock pronunciation scoring
    const words = transcript.trim().split(/\s+/).filter(Boolean).length
    const base = Math.min(95, 30 + words * 8)
    const variance = Math.floor(Math.random() * 10)
    const finalScore = Math.max(10, Math.min(100, base + variance))
    setScore(finalScore)
    setConfidence(finalScore / 100)
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto h-[80vh] bg-[linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.02))] rounded-2xl glass shadow-lg overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-white/6">
            <div>
              <h2 className="text-xl font-semibold">Speaking Practice</h2>
              <p className="text-sm text-white/60">Gapirishni mashq qiling — ovozingizni yozing va baholang</p>
            </div>
            <div className="text-sm text-white/60">Time: <span className="font-semibold">{timer}s</span></div>
          </div>

          <div className="flex-1 p-6 flex flex-col items-center justify-center gap-6">
            <BigMic listening={listening} onStart={handleStart} onStop={handleStop} />

            <div className="w-full max-w-xl text-center">
              <div className="text-sm text-white/60 mb-2">Transcript</div>
              <div className="glass p-4 rounded-lg min-h-[80px] text-left text-white/90">{transcript || <span className="text-white/50">Siz gapira boshlang...</span>}</div>
            </div>

            <div className="w-full max-w-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-white/60">Pronunciation score</div>
                <div className="text-lg font-semibold">{score !== null ? `${score}` : '—'}</div>
              </div>
              <ProgressBar value={confidence} />
            </div>

            <div className="mt-2 text-center text-sm text-white/60 max-w-xl">
              <em>{score === null ? 'Hozir boshlang va 30 soniya davomida gapiring. Yakunlanganidan so‘ng baho ko‘rsatiladi.' : 'Yaxshi ish! Davom eting, siz barqarorlikni oshirasiz.'}</em>
            </div>
          </div>

          <div className="p-4 border-t border-white/6 flex items-center justify-between">
            <div className="text-sm text-white/60">Tips: Start with a short story, describe your day, or answer a prompt.</div>
            <div className="flex items-center gap-3">
              <button onClick={() => { setTranscript(''); setScore(null); setConfidence(0); setTimer(30); }} className="btn-rounded glass bg-white/6">Reset</button>
              <button onClick={() => { if (!running) handleStart(); else handleStop(); }} className="btn-rounded bg-gradient-to-r from-indigo-500 to-sky-400">{running ? 'Stop' : 'Start'}</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
