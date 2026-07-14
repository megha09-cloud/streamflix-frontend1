import { useState } from 'react'

const linkColumns = [
  ['FAQ', 'Investor Relations', 'Privacy', 'Speed Test'],
  ['Help Centre', 'Jobs', 'Cookie Preferences', 'Legal Notices'],
  ['Account', 'Ways to Watch', 'Corporate Information', 'Contact Us'],
  ['Media Centre', 'Terms of Use', 'Only on Streamflix'],
]

export default function Footer() {
  const [langOpen, setLangOpen] = useState(false)
  const [lang, setLang] = useState('English')

  return (
    <footer className="bg-brand-black text-gray-400 px-4 xs:px-6 sm:px-8 md:px-12 py-8 xs:py-10 sm:py-14">
      <div className="max-w-5xl mx-auto">
        <p className="mb-6 xs:mb-8 text-xs xs:text-sm sm:text-base">
          Questions? Call{' '}
          <a href="tel:0008009191743" className="underline hover:text-white">
            000-800-919-1743
          </a>
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 xs:gap-x-6 gap-y-2 xs:gap-y-3 mb-8 xs:mb-10 text-xs xs:text-sm">
          {linkColumns.map((col, i) => (
            <ul key={i} className="flex flex-col gap-3">
              {col.map((link) => (
                <li key={link}>
                  <a href="#" className="underline hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div className="relative inline-block mb-8">
          <button
            onClick={() => setLangOpen((o) => !o)}
            className="flex items-center gap-1 text-gray-300 border border-gray-500 rounded-sm px-3 py-2 text-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            {lang}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {langOpen && (
            <ul className="absolute left-0 mt-1 bg-black border border-white/20 rounded-sm text-white text-sm w-32 overflow-hidden z-10">
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

        <p className="text-sm mb-1">Streamflix India</p>
        <p className="text-xs text-gray-500">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
        </p>
      </div>
    </footer>
  )
}
