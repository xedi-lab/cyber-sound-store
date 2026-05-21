import { useLocation, useNavigate } from 'react-router-dom'

const NAV_ITEMS = [
  { path: '/',         label: 'HOME',      icon: '⌂' },
  { path: '/services', label: 'SERVICES',  icon: '◈' },
  { path: '/portfolio',label: 'PORTFOLIO', icon: '▶' },
  { path: '/profile',  label: 'PROFILE',   icon: '◎' },
]

export function NavBar() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-cyber-black border-t border-cyber-border">
      {/* Electric top line */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyber-red to-transparent opacity-60" />

      <div className="flex items-stretch h-14">
        {NAV_ITEMS.map(item => {
          const active = location.pathname === item.path ||
            (item.path !== '/' && location.pathname.startsWith(item.path))
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-all duration-200
                font-mono text-[9px] tracking-widest uppercase relative overflow-hidden
                ${active
                  ? 'text-cyber-red border-t-2 border-cyber-red'
                  : 'text-cyber-text-dim border-t-2 border-transparent hover:text-cyber-red'
                }`}
            >
              {active && (
                <div className="absolute inset-0 bg-gradient-to-b from-cyber-red/10 to-transparent pointer-events-none" />
              )}
              <span className={`text-base leading-none relative z-10 ${active ? 'neon-text' : ''}`}>
                {item.icon}
              </span>
              <span className="relative z-10">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
