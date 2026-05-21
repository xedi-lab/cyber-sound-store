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
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-v-bg border-t border-v-border">
      <div className="flex h-14">
        {NAV.map(item => {
          const active = pathname === item.path ||
            (item.path !== '/' && pathname.startsWith(item.path))
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-all
                font-mono text-[9px] tracking-widest uppercase relative
                ${active ? 'text-v-white' : 'text-v-gray3 hover:text-v-gray2'}`}
            >
              {active && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-px bg-v-white opacity-60" />
              )}
              <span className={`text-sm leading-none ${active ? 'opacity-100' : 'opacity-40'}`}>
                {item.icon}
              </span>
              <span className={active ? 'text-v-white' : ''}>{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
