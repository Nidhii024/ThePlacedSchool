"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import CountUp from "@/components/count-up"

export default function TrustStrip() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const stats = [
    { value: 15, suffix: "K+", label: "Students Enrolled" },
    { value: 95, suffix: "%", label: "Placement Rate" },
    { value: 200, suffix: "+", label: "Industry Partners" },
    { value: 50, suffix: "+", label: "Expert Mentors" },
  ]

  return (
    <section ref={ref} className="py-16 bg-gradient-to-r from-gray-900 to-indigo-900">
      <div className="container mx-auto px-4 ">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate={controls}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group relative"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent flex justify-center items-end group">
                <CountUp end={stat.value} duration={2} />
                <motion.span whileHover={{ scale: 1.2, rotate: 10 }} className="cursor-pointer">
                  {stat.suffix}
                </motion.span>
              </div>
              <p className="text-gray-400 mt-2">{stat.label}</p>

              {/* Tooltip on hover */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-blue-900/90 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-48">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-blue-900/90"></div>
                <p>...and growing fast 🚀</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
