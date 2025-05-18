"use client"

import { useEffect } from "react"

import { useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

export default function LogoBelt() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Apple",
    "Meta",
    "Netflix",
    "Spotify",
    "Airbnb",
    "Uber",
    "Twitter",
    "Adobe",
    "Salesforce",
  ]

  return (
    <section ref={ref} className="py-16 bg-gradient-to-b from-gray-900 to-blue-500 ">
      <div className="container mx-auto px-4 mb-8 ">
        <motion.div
          className="text-center"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Trusted by Leading Companies
          </h2>
          <p className="text-gray-100">Our graduates work at top companies worldwide</p>
        </motion.div>
      </div>

      <div className="relative overflow-hidden">
        <motion.div
          className="flex space-x-12 py-8"
          animate={{
            x: [0, -1920],
          }}
          transition={{
            x: {
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
          }}
        >
          {[...companies, ...companies].map((company, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 flex items-center justify-center bg-gray-200 hover:bg-gradient-to-r from-purple-500 to-blue-500 !rounded-2xl shadow-sm px-8 py-4 w-48 h-20"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <span className="text-xl font-bold text-gray-700">{company}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
