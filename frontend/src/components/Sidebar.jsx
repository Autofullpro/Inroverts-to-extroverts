import React from 'react'
import { NavLink } from 'react-router-dom'
import { ChatBubbleLeftEllipsisIcon, MicrophoneIcon, UsersIcon } from '@heroicons/react/24/outline'

function NavItem({ to, icon, title, subtitle }) {
  return (
    <NavLink to={to} className={({ isActive }) => `w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${isActive ? 'glass border-2 border-slate-200 scale-102' : 'glass hover:scale-102'}`}>
      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">{icon}</div>
      <div>
        <div className="font-semibold text-slate-800">{title}</div>
        <div className="text-xs text-muted">{subtitle}</div>
      </div>
    </NavLink>
  )
}

export default function Sidebar() {
  return (
    <aside className="w-80 p-6 border-r border-slate-100 hidden md:block">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-sky-400 flex items-center justify-center font-bold text-white">W</div>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-slate-900">Websus Learning</h1>
          <p className="text-sm text-muted">Introvert uchun gaplashish mashqi</p>
        </div>
        <div>
          {/* Theme toggle */}
          <div style={{ width: 40 }}>
            {/* placeholder for ThemeToggle injected by parent layout */}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <NavItem to="/" icon={<ChatBubbleLeftEllipsisIcon className="w-5 h-5" />} title="Chat Practice" subtitle="AI bilan mashq" />
        <NavItem to="/speaking" icon={<MicrophoneIcon className="w-5 h-5" />} title="Speaking" subtitle="Ovoz bilan mashq" />
        <NavItem to="#" icon={<UsersIcon className="w-5 h-5" />} title="Community" subtitle="Partnerlar" />
      </div>

      <div className="mt-6 text-sm text-muted">
        <div className="mb-2">Daily streak</div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div className="h-3 bg-gradient-to-r from-indigo-400 to-sky-400 rounded-full" style={{ width: '42%' }} />
        </div>
      </div>
    </aside>
  )
}
