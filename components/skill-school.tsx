"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface SkillCardProps {
  title: string
  icon: string
  color: string
  details: string
}

const SkillCard = ({ title, icon, color, details }: SkillCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    if (!isFlipped) {
      setIsFlipped(true)
    } else {
      // Expand the card
      setIsExpanded(true)
    }
  }

  const handleClose = () => {
    // Close the expanded view and flip card back to front
    setIsExpanded(false)
    setIsFlipped(false) // Reset to front side when closing modal
  }

  return (
    <>
      <div className="bg-black">
        <motion.div
          ref={cardRef}
          className={`relative cursor-pointer ${isExpanded ? "opacity-0" : "opacity-100"}`}
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ transformStyle: "preserve-3d" }}
          animate={{
            rotateY: isFlipped ? 180 : 0,
            z: isHovered ? 20 : 0,
            boxShadow: isHovered
              ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 20 }}
          whileHover={{ scale: 1.05 }}
        >
          {/* Front of card */}
          <motion.div
            className={`absolute inset-0 flex flex-col items-center justify-center p-12 py-20 !rounded-xl ${color} shadow-lg`}
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Tape decoration */}
            <motion.div
              className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-yellow-200/80"
              animate={{ rotate: isHovered ? 6 : 3 }}
              transition={{ duration: 0.3 }}
            />

            <motion.div
              className="text-4xl mb-4"
              animate={{
                scale: isHovered ? [1, 1.2, 1] : 1,
                rotate: isHovered ? [0, -5, 5, 0] : 0,
              }}
              transition={{
                duration: 0.5,
                repeat: isHovered ? 1 : 0,
              }}
            >
              {icon}
            </motion.div>
            <h3 className="text-xl font-bold">{title}</h3>

            {/* Pin decoration */}
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border border-red-600"
              animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Back of card */}
          <motion.div
            className={`absolute inset-0 flex flex-col items-center justify-between p-8 rounded-lg bg-white text-gray-200 shadow-lg`}
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold mb-4 text-center text-black">{title}</h3>
              <p className="text-base text-center mb-6">{details}</p>
            </div>
            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-sm font-medium"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Expanded modal */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 p-4 text-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white/90 backdrop-blur-md rounded-xl p-8 max-w-2xl w-full relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
              >
                <motion.button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                  onClick={handleClose}
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </motion.button>

                <div className="flex items-center mb-6 ">
                  <motion.div
                    className={`w-12 h-12 rounded-full ${color} flex items-center justify-center text-2xl mr-4`}
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    {icon}
                  </motion.div>
                  <h2 className="text-2xl font-bold text-gray-500">{title}</h2>
                </div>

                <div className="prose max-w-none">
                  <p>{details}</p>
                  <h3>What You'll Learn</h3>
                  <ul>
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Fundamentals and core concepts
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      Practical, hands-on projects
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      Industry best practices
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      Portfolio-ready skills
                    </motion.li>
                  </ul>
                  <h3>Course Structure</h3>
                  <p>8-week intensive program with live sessions, assignments, and 1:1 mentorship.</p>
                </div>

                <div className="mt-8 flex justify-end">
                  <motion.button
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-medium"
                    onClick={handleClose}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Enroll Now
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default function SkillSchool() {
  const skills = [
    {
      title: "AI & Machine Learning",
      icon: "🤖",
      color: "bg-yellow-100 text-yellow-800",
      details:
        "Master AI fundamentals, machine learning algorithms, and practical applications in real-world scenarios.",
    },
    {
      title: "Digital Marketing",
      icon: "📊",
      color: "bg-green-100 text-green-800",
      details: "Learn SEO, content marketing, social media strategies, and analytics to drive growth and engagement.",
    },
    {
      title: "UX/UI Design",
      icon: "🎨",
      color: "bg-purple-100 text-purple-800",
      details: "Create beautiful, user-centered designs with industry-standard tools and proven methodologies.",
    },
    {
      title: "Web Development",
      icon: "💻",
      color: "bg-blue-100 text-blue-800",
      details: "Build modern, responsive websites and applications using the latest frameworks and technologies.",
    },
    {
      title: "Data Science",
      icon: "📈",
      color: "bg-red-100 text-red-800",
      details:
        "Analyze complex datasets, create visualizations, and extract meaningful insights for business decisions.",
    },
    {
      title: "Product Management",
      icon: "🚀",
      color: "bg-orange-100 text-orange-800",
      details: "Lead product development from ideation to launch with agile methodologies and user-focused strategies.",
    },
  ]

  const containerRef = useRef(null)
  const [ref, isInView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
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
              Skill School
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Master in-demand skills with our expert-led courses and hands-on projects
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
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
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
                className="h-96" // Increased height from h-72 to h-96
              >
                <SkillCard {...skill} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}