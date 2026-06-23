import React from 'react'

export default function BigMic({ listening, onStart, onStop }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={() => (listening ? onStop() : onStart())}
        className={`w-40 h-40 rounded-full flex items-center justify-center shadow-soft text-3xl ${listening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 text-slate-800'}`}
      >
        {listening ? '⏺️' : '🎤'}
      </button>
      <div className="text-sm text-muted">{listening ? 'Recording...' : 'Tap to start speaking'}</div>
    </div>
  )
}
