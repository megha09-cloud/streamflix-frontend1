import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
export default function EmailCaptureForm({ align = 'center' }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) {
      setError('Please enter a valid email or phone number.')
      return
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email or phone number.')
      return
    }
    setError('');
    // In a real app: navigate to signup flow with the email pre-filled
    navigate('/signup',{state: { email }});
      return ;
    }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col ${align === 'center' ? 'items-center' : 'items-start'} w-full`}
      noValidate
    >
      <div className="flex flex-col xs:flex-row gap-2 w-full max-w-xl xs:max-w-2xl">
        <div className="flex-1 min-w-0">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full h-12 xs:h-14 px-3 xs:px-4 bg-black/60 border border-white/40 text-white placeholder-gray-400 text-sm xs:text-base focus:outline-none focus:border-white rounded-sm"
            aria-label="Email address"
          />
        </div>
        <button
          type="submit"
          className="h-12 xs:h-14 px-4 xs:px-6 bg-brand-red hover:bg-red-700 transition-colors text-white text-base xs:text-xl font-medium rounded-sm flex items-center justify-center gap-1.5 xs:gap-2 whitespace-nowrap shrink-0"
        >
          Get Started
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="xs:w-6 xs:h-6">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">⚠ {error}</p>}
    </form>
  )
}
