import {useEffect,useRef,useState} from 'react'
import { tmdbFetch, normalize } from '../services/tmdb'

 
//const trendingTitles = [
 // { rank: 1, title: 'Lock Upp', color: '#701a75' },
  //{ rank: 2, title: 'Ghost Bangla', color: '#1e3a5f' },
  //{ rank: 3, title: 'Blast', color: '#7f1d1d' },
 // { rank: 4, title: 'Peddi', color: '#78350f' },
 // { rank: 5, title: 'Teach a Lesson', color: '#3730a3' },
 // { rank: 6, title: 'Formline', color: '#134e3a' },
 // { rank: 7, title: 'Even Odds', color: '#581c1a' },
//]

export default function TrendingCarousel() {
  const scrollerRef = useRef(null)
  const [trendingTitles, setTrendingTitles]=useState([])
  useEffect(()=>{
    tmdbFetch('/trending/movie/week').then((data)=>{
      const results =(data.results||[]).slice(0,9).map((movie,index)=>{
        const clean=normalize(movie)
        return { rank:index+1,title:clean.title,poster:clean.poster}
      })
      setTrendingTitles(results)
    })
  }, [])

  const scrollNext = () => {
    scrollerRef.current?.scrollBy({ left: 320, behavior: 'smooth' })
  }

  return (
    <section className="px-4 xs:px-6 sm:px-8 md:px-12 py-8 xs:py-10 sm:py-14 bg-brand-black">
      <h2 className="text-white text-xl xs:text-2xl sm:text-3xl font-bold mb-4 xs:mb-6">Trending Now</h2>

      <div className="relative">
        <div
          ref={scrollerRef}
          className="flex gap-3 xs:gap-4 overflow-x-scroll  scroll-smooth pb-2 tmdb-scrollbar"
        >
          {trendingTitles.map((item) => (
            <div key={item.rank} className="relative flex-shrink-0 w-[130px] xs:w-[160px] sm:w-[200px] md:w-[220px]">
              <span
                className="absolute -left-2 xs:-left-3 sm:-left-4 bottom-0 text-[60px] xs:text-[80px] sm:text-[110px] md:text-[120px] font-black leading-none select-none pointer-events-none"
                style={{
                  WebkitTextStroke: '2px rgba(255,255,255,0.5)',
                  color: 'rgba(20,20,20,0.9)',
                  zIndex: 1,
                }}
              >
                {item.rank}
              </span>
              <div
                className="relative aspect-[2/3] rounded ml-4 xs:ml-6 sm:ml-8 flex items-end p-2 xs:p-3 text-white font-semibold text-xs xs:text-sm shadow-lg z-10"
              >
                <img src={item.poster} alt={item.title} className="w-full h-full object-cover"/>
              
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={scrollNext}
          aria-label="Next"
          className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 items-center justify-center text-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  )
}
