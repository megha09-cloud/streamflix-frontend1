import { useState } from 'react'
import EmailCaptureForm from './EmailCaptureForm'

const faqs = [
  {
    q: 'What is Streamflix?',
    a: "Streamflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more on thousands of internet-connected devices. You can watch as much as you want, whenever you want, all for one low fixed monthly price. There's always something new to discover, and new TV shows and movies are added every week!",
  },
  {
    q: 'How much does Streamflix cost?',
    a: (
      <>
        Watch Streamflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all
        for one fixed monthly fee. Plans range from ₹149 to ₹649/month. No extra costs, no
        contracts.{' '}
        <a href="#" className="faq-link">
          Learn more.
        </a>
      </>
    ),
  },
  {
    q: 'Where can I watch?',
    a: 'Watch anywhere, anytime, on an unlimited number of devices. Sign in with your account to watch instantly on the web at streamflix.example.com from your personal computer or on any internet-connected device that offers the Streamflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.',
  },
  {
    q: 'How do I cancel?',
    a: 'Streamflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees — start or stop your account at any time.',
  },
  {
    q: 'What can I watch on Streamflix?',
    a: 'Streamflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning originals and more. Watch as much as you want, any time you want.',
  },
  {
    q: 'Is Streamflix good for kids?',
    a: 'The Streamflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space. Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch.',
  },
]

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(1)

  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx))
  }

  return (
    <section className="px-4 xs:px-6 sm:px-8 md:px-0 py-8 xs:py-10 sm:py-14 bg-brand-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-white text-xl xs:text-2xl sm:text-4xl font-bold mb-4 xs:mb-6">Frequently Asked Questions</h2>

        <div className="flex flex-col gap-0.5">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx
            return (
              <div key={item.q}>
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between bg-[#2d2d2d] hover:bg-[#3a3a3a] transition-colors text-white text-sm xs:text-lg sm:text-2xl font-normal px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <span className="text-2xl xs:text-3xl font-light shrink-0 ml-3 xs:ml-4">{isOpen ? '×' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="bg-[#2d2d2d] px-3 xs:px-4 sm:px-6 pb-5 xs:pb-6 pt-0 -mt-0.5">
                    <p className="text-white text-sm xs:text-base sm:text-xl max-w-2xl">{item.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-8 xs:mt-10 sm:mt-14 flex flex-col items-center gap-3 xs:gap-4 text-center">
          <p className="text-white text-sm xs:text-base sm:text-lg">
            Ready to watch? Enter your email to create or restart your membership.
          </p>
          <EmailCaptureForm />
        </div>
      </div>
    </section>
  )
}
