"use client"

import { useEffect } from "react"

import { useRef, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

export default function BookConsultation() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const controls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const handleClick = () => {
    setIsClicked(true)

    // Scroll to form
    const formElement = document.getElementById("consultation-form")
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" })
    }

    // Reset after animation
    setTimeout(() => {
      setIsClicked(false)
    }, 1000)
  }

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900 text-white relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/10"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
              x: [0, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.h2
            className="text-4xl font-bold mb-6 "
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Not Sure Where to Start?
          </motion.h2>

          <motion.p
            className="text-xl text-blue-100 mb-10"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Book a free consultation with our career advisors to find the right path for you
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <motion.button
              className="relative px-8 py-4 text-lg font-bold bg-white/20 backdrop-blur-md text-black border border-white/30 rounded-full overflow-hidden group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleClick}
              whileHover={{ scale: 1.05 }}
              animate={isClicked ? { scale: [1, 0.95, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {/* Pulsing glow */}
              <motion.div
                className="absolute inset-0 bg-gray-200 hover:bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                animate={{
                  boxShadow: isHovered
                    ? ["0 0 0 0 rgba(255, 255, 255, 0.7)", "0 0 0 15px rgba(255, 255, 255, 0)"]
                    : "0 0 0 0 rgba(255, 255, 255, 0)",
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />

              {/* Orbiting light */}
              {isHovered && (
                <motion.div
                  className="absolute w-6 h-6 rounded-full bg-blue-300/50 blur-sm"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  style={{
                    position: "absolute",
                    top: "-20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                />
              )}

              <span className="relative z-10 flex items-center justify-center">
                {isHovered ? "Let's Talk " : "Book a Consultation"}

                {isHovered && (
                  <motion.span
                    className="ml-2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10 5l7 7-7 7"></path>
                    </svg>
                  </motion.span>
                )}
              </span>

              {/* Sparkle animation on click */}
              {isClicked && (
                <>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                      initial={{
                        x: 0,
                        y: 0,
                        opacity: 1,
                      }}
                      animate={{
                        x: (Math.random() - 0.5) * 100,
                        y: (Math.random() - 0.5) * 100,
                        opacity: 0,
                        scale: [1, 0],
                      }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Consultation Form */}
        <motion.div
          id="consultation-form"
          className="max-w-2xl mx-auto mt-20 p-8 bg-white/10 backdrop-blur-xl rounded-xl shadow-xl border border-white/20"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.6 } },
          }}
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Schedule Your Free Session</h3>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-blue-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-blue-200/70"
                  placeholder="Your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-blue-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-blue-200/70"
                  placeholder="Your last name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-blue-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-blue-200/70"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">What are you interested in?</label>
              <select className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-blue-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black">
                <option value="">Select an option</option>
                <option value="ai">AI & Machine Learning</option>
                <option value="web">Web Development</option>
                <option value="data">Data Science</option>
                <option value="design">UX/UI Design</option>
                <option value="marketing">Digital Marketing</option>
                <option value="product">Product Management</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Preferred Date & Time</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-blue-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                />
                <select className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-blue-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white">
                  <option value="">Select time</option>
                  <option value="morning">Morning (9AM - 12PM)</option>
                  <option value="afternoon">Afternoon (1PM - 5PM)</option>
                  <option value="evening">Evening (6PM - 9PM)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-lg font-bold text-lg hover:bg-white/30 transition-all"
            >
              Book My Free Session
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
