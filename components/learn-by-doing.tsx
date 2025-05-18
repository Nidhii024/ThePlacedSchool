"use client"

import { useEffect } from "react"

import { useRef, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

interface ProjectCardProps {
  title: string
  category: string
  image: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  status: "LIVE" | "UPCOMING" | "COMPLETED"
}

const ProjectCard = ({ title, category, image, difficulty, status }: ProjectCardProps) => {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="relative h-80 rounded-xl overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{
        scale: 1.03,
        rotateY: 5,
        rotateX: -5,
        z: 20,
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Background image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Status badge */}
      <motion.div
        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
          status === "LIVE"
            ? "bg-green-500 text-white"
            : status === "UPCOMING"
              ? "bg-yellow-500 text-black"
              : "bg-blue-500 text-white"
        }`}
        initial={{ opacity: 0, scale: 0 }}
        animate={hovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 0.2 }}
      >
        {status}
      </motion.div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6">
        <div className="text-sm text-blue-300 mb-2">{category}</div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-300">{difficulty}</span>

          <motion.button
            className="px-4 py-1 bg-white text-blue-900 rounded-full text-sm font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            View Project
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default function LearnByDoing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const controls = useAnimation()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const projects = [
    {
      title: "AI-Powered Chatbot",
      category: "Machine Learning",
      image: "/python.png",
      difficulty: "Intermediate" as const,
      status: "LIVE" as const,
    },
    {
      title: "E-commerce Platform",
      category: "Web Development",
      image: "/react.png",
      difficulty: "Advanced" as const,
      status: "LIVE" as const,
    },
    {
      title: "Data Visualization Dashboard",
      category: "Data Science",
      image: "/javascript.png",
      difficulty: "Intermediate" as const,
      status: "UPCOMING" as const,
    },
    {
      title: "Mobile App Redesign",
      category: "UX/UI Design",
      image: "/css.png",
      difficulty: "Beginner" as const,
      status: "COMPLETED" as const,
    },
    {
      title: "Social Media Campaign",
      category: "Digital Marketing",
      image: "/nodejs.png",
      difficulty: "Beginner" as const,
      status: "LIVE" as const,
    },
    {
      title: "Product Launch Strategy",
      category: "Product Management",
      image: "/html.png",
      difficulty: "Advanced" as const,
      status: "UPCOMING" as const,
    },
  ]

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-gray-900 via-indigo-900 to-black text-white">
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
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              Learn by Doing
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Build real-world projects that showcase your skills to potential employers
            </p>
          </motion.div>

          {/* 3D Carousel */}
          <motion.div
            className="relative h-[500px] overflow-hidden"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {projects.map((project, index) => {
                const distance = Math.min(
                  Math.abs(index - activeIndex),
                  Math.abs(index - activeIndex - projects.length),
                  Math.abs(index - activeIndex + projects.length),
                )

                const isActive = distance === 0
                const offset = distance * 250
                const zIndex = projects.length - distance

                return (
                  <motion.div
                    key={index}
                    className="absolute w-full max-w-md"
                    animate={{
                      x: index === activeIndex ? 0 : index > activeIndex ? offset : -offset,
                      scale: 1 - distance * 0.15,
                      opacity: 1 - distance * 0.2,
                      zIndex,
                    }}
                    transition={{ duration: 0.5 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                      if (info.offset.x > 100) {
                        setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
                      } else if (info.offset.x < -100) {
                        setActiveIndex((prev) => (prev + 1) % projects.length)
                      }
                    }}
                  >
                    <ProjectCard {...project} />
                  </motion.div>
                )
              })}
            </div>

            {/* Navigation dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${index === activeIndex ? "bg-blue-500" : "bg-gray-500"}`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
