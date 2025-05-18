"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import CursorTrail from "@/components/cursor-trail"
import HeroBanner from "@/components/hero-banner"
import TrustStrip from "@/components/trust-strip"
import SkillSchool from "@/components/skill-school"
import WhyChoose from "@/components/why-choose"
import BookConsultation from "@/components/book-consultation"
import Mentorship from "@/components/mentorship"
import LearnByDoing from "@/components/learn-by-doing"
import LogoBelt from "@/components/logo-belt"
import Footer from "@/components/footer"

export default function Home() {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [headerClass, setHeaderClass] = useState("py-6")
  const scrollRef = useRef(null)
  const isInView = useInView(scrollRef)
  const controls = useAnimation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true)
        setHeaderClass("py-3 bg-black/70 backdrop-blur-lg")
      } else {
        setHasScrolled(false)
        setHeaderClass("py-6")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <main className="relative overflow-x-hidden">
      <CursorTrail />

      {/* Sticky Header */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerClass}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
          >
            The PlacedSchool
          </motion.div>
          <nav>
            <motion.ul
              className="flex space-x-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
            >
              {["Courses", "About", "Mentorship", "Pricing", "Contact"].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <HeroBanner />
      <TrustStrip />
      <SkillSchool />
      <WhyChoose />
      <BookConsultation />
      <Mentorship />
      <LearnByDoing />
      <LogoBelt />

      {/* Footer */}
      <Footer />
    </main>
  )
}
