import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

function NavItem({ to, icon, title, subtitle }) {
  return (
    <NavLink to={to} className={({ isActive }) => `w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${isActive ? 'glass border-2 border-white/8 scale-102' : 'glass hover:scale-102'}`}>
      <div className="w-10 h-10 rounded-full bg-white/6 flex items-center justify-center">{icon}</div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-xs text-white/60">{subtitle}</div>
      </div>
    </NavLink>
  )
}

export default function Sidebar() {
  return (
    <aside className="w-80 p-6 border-r border-white/6 hidden md:block">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-sky-400 flex items-center justify-center font-bold text-black">W</div>
        <div>
          <h1 className="text-lg font-bold">Websus Learning</h1>
          <p className="text-sm text-white/60">Introvert uchun gaplashish mashqi</p>
        </div>
      </div>

      <div className="space-y-3">
        <motion.div whileHover={{ scale: 1.02 }}>
          <NavItem to="/" icon={<span>💬</span>} title="Chat Practice" subtitle="AI bilan mashq" />
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <NavItem to="/speaking" icon={<span>🎙️</span>} title="Speaking" subtitle="Ovoz bilan mashq" />
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <NavItem to="#" icon={<span>👥</span>} title="Community" subtitle="Partnerlar" />
        </motion.div>
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
