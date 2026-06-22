import React from 'react'
import { motion } from 'framer-motion'

export default function MessageBubble({ role, text }) {
  const isUser = role === 'user'
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`${isUser ? 'bg-gradient-to-r from-indigo-500 to-sky-400 text-black' : 'bg-white/6 text-white'} max-w-[70%] p-3 rounded-2xl shadow-md`}>
        <div className="whitespace-pre-wrap">{text}</div>
      </div>
    </motion.div>
  )
}
