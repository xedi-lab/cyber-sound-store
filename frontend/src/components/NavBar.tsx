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
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#161616] border-t border-v-border">
      <div className="flex h-14">
        {NAV.map(item => {
          const active = pathname === item.path ||
            (item.path !== '/' && pathname.startsWith(item.path))
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors
                font-mono text-[9px] tracking-widest uppercase relative
                ${active ? 'text-v-white' : 'text-v-gray3 hover:text-v-gray2'}`}
            >
              {active && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-px bg-v-white opacity-40" />
              )}
              <span className={`text-sm leading-none ${active ? 'opacity-90' : 'opacity-25'}`}>
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
