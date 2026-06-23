import React from 'react'

export default function ProgressBar({ value = 0 }) {
  const pct = Math.round(value * 100)
  return (
    <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
      <div className="h-4 bg-gradient-to-r from-indigo-400 to-sky-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
    </div>
  )
}
