const features = [
  {
    title: 'Enjoy on your TV',
    body: 'Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="18" height="12" rx="1" stroke="#E50914" strokeWidth="1.5" />
        <path d="M8 20h8M12 16v4" stroke="#E50914" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Download your shows to watch offline',
    body: 'Save your favourites easily and always have something to watch.',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="#E50914" strokeWidth="1.5" />
        <path d="M12 7v7m0 0l-3-3m3 3l3-3" stroke="#E50914" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Watch everywhere',
    body: 'Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="7" width="14" height="10" rx="1" stroke="#E50914" strokeWidth="1.5" />
        <rect x="17" y="9" width="5" height="8" rx="1" stroke="#E50914" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: 'Create profiles for kids',
    body: 'Send kids on adventures with their favourite characters in a space made just for them — free with your membership.',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="3.5" stroke="#E50914" strokeWidth="1.5" />
        <circle cx="16" cy="14" r="3.5" stroke="#E50914" strokeWidth="1.5" />
      </svg>
    ),
  },
]

export default function FeatureGrid() {
  return (
    <section className="px-4 xs:px-6 sm:px-8 md:px-12 py-4 xs:py-6 sm:py-8 bg-brand-black">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-md p-5 xs:p-6 flex flex-col justify-between min-h-[180px] xs:min-h-[200px] sm:min-h-[220px]"
            style={{
              background: 'linear-gradient(135deg, #1a1330 0%, #2b1740 100%)',
            }}
          >
            <div>
              <h3 className="text-white text-lg xs:text-xl sm:text-2xl font-bold mb-2">{f.title}</h3>
              <p className="text-gray-300 text-sm sm:text-base">{f.body}</p>
            </div>
            <div className="self-end mt-4">{f.icon}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
