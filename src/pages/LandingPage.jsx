import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import TrendingCarousel from '../components/TrendingCarousel'
import FeatureGrid from '../components/FeatureGrid'
import FaqAccordion from '../components/FaqAccordion'
import Footer from '../components/Footer'

export default function App() {
  return (
    <div className="bg-brand-black min-h-screen">
      <Navbar />
      <Hero />
      <TrendingCarousel />
      <FeatureGrid />
      <FaqAccordion />
      <Footer />
    </div>
  )
}
