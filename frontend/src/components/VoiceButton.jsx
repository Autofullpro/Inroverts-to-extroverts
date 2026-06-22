import React from 'react'

export default function VoiceButton({ listening, onStart, onStop }) {
  return (
    <button
      onClick={() => { listening ? onStop() : onStart() }}
      className={`w-12 h-12 rounded-full flex items-center justify-center ${listening ? 'bg-red-500 animate-pulse' : 'bg-white/6'} hover:scale-105 transition-transform`}
      title={listening ? "Stop recording" : "Start speaking"}
    >
      <span className="text-sm">{listening ? '⏹️' : '🎤'}</span>
    </button>
  )
}
