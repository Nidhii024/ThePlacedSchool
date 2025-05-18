"use client"

import { useEffect } from "react"

import { useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

export default function Mentorship() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const mentorshipFeatures = [
    {
      title: "1:1 Mentorship",
      description: "Weekly sessions with industry experts who guide your learning journey",
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
    {
      title: "Resume Review",
      description: "Get expert feedback on your resume to stand out to employers",
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      ),
    },
    {
      title: "Mock Interviews",
      description: "Practice with real interview questions from top companies",
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
    },
  ]

  const careerTimeline = [
    {
      title: "Resume Review",
      description: "Get expert feedback on your resume to stand out to employers",
      icon: "📄",
    },
    {
      title: "1:1 Career Coaching",
      description: "Personalized guidance to help you navigate your career path",
      icon: "🧭",
    },
    {
      title: "Mock Interviews",
      description: "Practice with real interview questions from top companies",
      icon: "🎯",
    },
    {
      title: "Job Placement",
      description: "Get connected with our network of hiring partners",
      icon: "🤝",
    },
  ]

  return (
    <section ref={ref} className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <motion.div
            className="text-center mb-16"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
              Mentorship & Career Assistance
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We don't just teach you skills, we help you land your dream job
            </p>
          </motion.div>

          {/* Mentorship Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold mb-8  bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">Expert Mentorship</h3>

              <div className="space-y-8">
                {mentorshipFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="flex-shrink-0 mr-4 text-blue-500">{feature.icon}</div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Animated chat bubbles
              <div className="relative mt-12 h-40">
                {["Need help with your portfolio?", "Here's a tip for your interview!", "Let me review your code"].map(
                  (text, index) => (
                    <motion.div
                      key={index}
                      className="absolute left-0 bg-blue-100 text-blue-800 p-3 rounded-lg rounded-bl-none max-w-xs"
                      style={{ top: index * 50 }}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                          delay: index * 0.5 + 1,
                          duration: 0.5,
                        },
                      }}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2 text-sm">
                          M
                        </div>
                        <p className="text-sm">{text}</p>
                      </div>
                    </motion.div>
                  ),
                )}
              </div> */}
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, x: 30 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">Career Assistance</h3>

              {/* Interactive Timeline */}
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-blue-200"></div>

                {careerTimeline.map((item, index) => (
                  <motion.div
                    key={index}
                    className="relative mb-12 pl-20 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.2 }}
                  >
                    <motion.div
                      className="absolute left-0 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white flex items-center justify-center text-2xl"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.icon}
                    </motion.div>

                    <div>
                      <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                      <p className="text-gray-300">{item.description}</p>

                      {/* Progress indicators */}
                      <div className="mt-4 flex">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center ${
                              i <= index ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: index * 0.2 + i * 0.1 }}
                          >
                            {i <= index && (
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
