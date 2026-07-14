import EmailCaptureForm from './EmailCaptureForm'

// Generic placeholder "poster" tiles for the background collage —
// original color blocks + titles, not real artwork.
const posterTiles = [
  { title: 'Midnight Circuit', color: '#7c2d12' },
  { title: 'The Wondertools', color: '#78350f' },
  { title: 'Formline', color: '#1e3a5f' },
  { title: 'Latent Truth', color: '#3f1d38' },
  { title: 'Sun & Substance', color: '#7f1d1d' },
  { title: 'Coin & Totem', color: '#134e3a' },
  { title: 'Blindside', color: '#312e81' },
  { title: 'Animal Kingdom Diaries', color: '#4a5568' },
  { title: 'Loyal Companions', color: '#365314' },
  { title: 'Signal Static', color: '#1e293b' },
  { title: 'Even Odds', color: '#581c1a' },
  { title: 'Great Kitchens', color: '#78350f' },
  { title: 'Bear Season 29', color: '#164e63' },
  { title: 'Teach a Lesson', color: '#3730a3' },
  { title: 'Locked In', color: '#701a75' },
]

export default function Hero() {
  return (
    <section className="relative min-h-[560px] xs:min-h-[620px] sm:min-h-[750px] md:min-h-[800px] flex items-center overflow-hidden">
      {/* background collage */}
    {/* <ddiv>
          )iv className="absolute inset-0 grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-7 md:grid-cols-9 gap-0.5 xs:gap-1 opacity-60 -rotate-2 scale-110">
        {Array.from({ length: 45 }).map((_, i) => {
          const tile = posterTiles[i % posterTiles.length]
          return (
            <div
              key={i}
              className="aspect-[2/3] flex items-end p-1.5 xs:p-2 text-[8px] xs:text-[10px] text-white/70 font-semibold"
              style={{ backgroundImage:"URL('/images/bkimg2.jpg')", backgroundSize:"cover",backgroundPosition:"center"}}
            >
              {tile.title}
            </
        })}
      </div>*/}
      <div>
        <img src="/images/bkimg.webp" alt ="background" className="absolute inset-0 w-full h-full object-cover"></img>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 via-black/70 t0-[#2b2b2b]"></div>
        

        </div>
      

      {/* dark gradient overlay for readability */}

      {/* content */}
        <div className="relative z-10 w-full px-4 xs:px-6 sm:px-8 md:px-0 max-w-[740px] mx-auto text-center flex flex-col items-center gap-3 xs:gap-4 sm:gap-5">
        <h1 className="text-white font-black text-[28px] xs:text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight">
          Unlimited movies,
          <br />
          shows, and more
        </h1>
        <p className="text-white text-base xs:text-lg sm:text-2xl font-normal">
          Starts at ₹149. Cancel at any time.
        </p>
        <p className="text-white text-sm xs:text-base sm:text-lg">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <EmailCaptureForm />
      </div>
    </section>
  )
}
