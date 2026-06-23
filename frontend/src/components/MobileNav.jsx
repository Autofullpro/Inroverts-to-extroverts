import React from 'react'
import { NavLink } from 'react-router-dom'
import { ChatBubbleLeftEllipsisIcon, MicrophoneIcon, UserGroupIcon } from '@heroicons/react/24/outline'

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
      <div className="bg-white glass p-3 rounded-full flex items-center justify-between shadow-sm">
        <NavLink to="/" className="flex-1 text-center touch-target">
          <ChatBubbleLeftEllipsisIcon className="w-6 h-6 mx-auto text-slate-700" />
          <div className="text-xs text-muted">Chat</div>
        </NavLink>

        <NavLink to="/speaking" className="flex-1 text-center touch-target">
          <MicrophoneIcon className="w-6 h-6 mx-auto text-slate-700" />
          <div className="text-xs text-muted">Speak</div>
        </NavLink>

        <NavLink to="#" className="flex-1 text-center touch-target">
          <UserGroupIcon className="w-6 h-6 mx-auto text-slate-700" />
          <div className="text-xs text-muted">Community</div>
        </NavLink>
      </div>
    </nav>
  )
}
