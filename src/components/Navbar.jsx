import { useState } from 'react'
import { useNavigate} from 'react-router-dom'

export default function Navbar() {
  const [langOpen, setLangOpen] = useState(false)
  const [lang, setLang] = useState('English')
  const navigate = useNavigate()

  return (
    <header className="absolute top-0 left-0 right-0 z-20 bg-top-fade">
      <nav className="flex items-center justify-between px-3 xs:px-4 sm:px-8 md:px-12 py-3 sm:py-6">
        <div className="text-brand-red font-black text-xl xs:text-2xl sm:text-3xl md:text-4xl tracking-tight select-none">
          STREAMFLIX
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <button
              onClick={() => setLangOpen((o) => !o)}
              className="flex items-center gap-1 text-white border border-white/50 rounded-sm px-1.5 xs:px-2 py-1 xs:py-1.5 text-xs xs:text-sm bg-black/30"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="xs:w-[18px] xs:h-[18px]">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span className="hidden xs:inline">{lang}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="xs:w-[14px] xs:h-[14px]">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {langOpen && (
              <ul className="absolute right-0 mt-1 bg-black border border-white/20 rounded-sm text-white text-sm w-32 overflow-hidden">
                {['English', 'हिंदी'].map((l) => (
                  <li key={l}>
                    <button
                      onClick={() => {
                        setLang(l)
                        setLangOpen(false)
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-white/10"
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button  onClick={() =>{console.log('clicked');navigate('/login');}} className="bg-brand-red hover:bg-red-700 transition-colors text-white text-xs xs:text-sm sm:text-base font-medium px-2.5 xs:px-3 sm:px-4 py-1.5 rounded-sm">
            Sign In
          </button>
        </div>
      </nav>
    </header>
  )
}
