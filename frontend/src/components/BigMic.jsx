import React from 'react'
import { motion } from 'framer-motion'

export default function BigMic({ listening, onStart, onStop }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <motion.button
        onClick={() => (listening ? onStop() : onStart())}
        className={`w-40 h-40 rounded-full flex items-center justify-center shadow-soft text-3xl ${listening ? 'bg-red-500 text-white animate-pulse' : 'bg-white/6 text-white'}`}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.03 }}>
        {listening ? '⏺️' : '🎤'}
      </motion.button>
      <div className="text-sm text-white/60">{listening ? 'Recording...' : 'Tap to start speaking'}</div>
    </div>
  )
}
