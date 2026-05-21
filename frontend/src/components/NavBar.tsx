import { useLocation, useNavigate } from 'react-router-dom'

const NAV = [
  { path: '/',          label: 'HOME',      icon: '⌂' },
  { path: '/services',  label: 'SERVICES',  icon: '◈' },
  { path: '/portfolio', label: 'PORTFOLIO', icon: '▶' },
  { path: '/profile',   label: 'PROFILE',   icon: '◎' },
]

export function NavBar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-cyber-black border-t border-cyber-border">
      <div className="flex h-14">
        {NAV.map(item => {
          const active = pathname === item.path ||
            (item.path !== '/' && pathname.startsWith(item.path))
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-all
                font-mono text-[9px] tracking-widest uppercase
                ${active
                  ? 'text-cyber-red'
                  : 'text-cyber-text-3 hover:text-cyber-text-2'
                }`}
            >
              {active && (
                <div className="absolute top-0 w-8 h-px bg-cyber-red" />
              )}
              <span className={`text-sm leading-none ${active ? 'drop-shadow-[0_0_6px_#ff2020]' : ''}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
