import React from 'react'
import { motion } from 'framer-motion'

export default function Sidebar() {
  return (
    <aside className="w-80 p-6 border-r border-white/6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-sky-400 flex items-center justify-center font-bold text-black">W</div>
        <div>
          <h1 className="text-lg font-bold">Websus Learning</h1>
          <p className="text-sm text-white/60">Introvert uchun gaplashish mashqi</p>
        </div>
      </div>

      <div className="space-y-3">
        <motion.button whileHover={{ scale: 1.02 }} className="w-full text-left p-3 rounded-xl glass flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/6 flex items-center justify-center">💬</div>
          <div>
            <div className="font-semibold">Chat Practice</div>
            <div className="text-xs text-white/60">AI bilan mashq</div>
          </div>
        </motion.button>

        <motion.button whileHover={{ scale: 1.02 }} className="w-full text-left p-3 rounded-xl glass flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/6 flex items-center justify-center">🎙️</div>
          <div>
            <div className="font-semibold">Speaking</div>
            <div className="text-xs text-white/60">Ovoz bilan mashq</div>
          </div>
        </motion.button>

        <motion.button whileHover={{ scale: 1.02 }} className="w-full text-left p-3 rounded-xl glass flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/6 flex items-center justify-center">👥</div>
          <div>
            <div className="font-semibold">Community</div>
            <div className="text-xs text-white/60">Partnerlar</div>
          </div>
        </motion.button>
      </div>

      <div className="mt-6 text-sm text-white/60">
        <div className="mb-2">Daily streak</div>
        <div className="w-full bg-white/6 rounded-full h-3 overflow-hidden">
          <div className="h-3 bg-gradient-to-r from-indigo-400 to-sky-400 rounded-full" style={{ width: '42%' }} />
        </div>
      </div>
    </aside>
  )
}
