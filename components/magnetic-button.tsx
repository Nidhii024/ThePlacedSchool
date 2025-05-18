"use client"

import { useState, useRef, type MouseEvent, type ReactNode } from "react"
import { motion } from "framer-motion"

interface MagneticButtonProps {
  children: ReactNode
  primary?: boolean
}

export default function MagneticButton({ children, primary = false }: MagneticButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const buttonRef = useRef<HTMLDivElement>(null)
  const [buttonText, setButtonText] = useState(children)

  const handleMouseMove = (e: MouseEvent) => {
    if (!buttonRef.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect()

    const x = (clientX - (left + width / 2)) * 0.3
    const y = (clientY - (top + height / 2)) * 0.3

    setPosition({ x, y })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setPosition({ x: 0, y: 0 })
  }

  const handleClick = () => {
    setIsClicked(true)

    // Change text to emoji briefly
    const originalText = buttonText
    setButtonText("🚀")

    setTimeout(() => {
      setButtonText(originalText)
      setIsClicked(false)
    }, 600)
  }

  const borderVariants = {
    initial: {
      backgroundPosition: "0% 50%",
    },
    hover: {
      backgroundPosition: "100% 50%",
    },
  }

  return (
    <motion.div
      ref={buttonRef}
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <motion.div
        className={`relative z-10 px-8 py-3 rounded-full font-bold text-lg cursor-pointer overflow-hidden
          ${primary ? "text-white" : "text-blue-400 border border-blue-400"}`}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
        variants={{
          initial: {
            scale: 1,
          },
          hover: {
            scale: 1.05,
          },
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Button background */}
        {primary && (
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              background: "linear-gradient(90deg, #6366f1, #3b82f6, #8b5cf6, #6366f1)",
              backgroundSize: "300% 100%",
            }}
            variants={borderVariants}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        )}

        {/* Button border for non-primary */}
        {!primary && (
          <motion.div
            className="absolute inset-0 rounded-full z-0"
            style={{
              background: "linear-gradient(90deg, #6366f1, #3b82f6, #8b5cf6, #6366f1)",
              backgroundSize: "300% 100%",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              padding: "1px",
            }}
            variants={borderVariants}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        )}

        {/* Button text */}
        <motion.span
          className="relative z-10 block"
          animate={isClicked ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.6 }}
        >
          {buttonText}
        </motion.span>
      </motion.div>

      {/* Pulse effect */}
      {isHovered && (
        <motion.div
          className={`absolute inset-0 rounded-full ${primary ? "bg-indigo-500" : "bg-blue-400"}`}
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
        />
      )}
    </motion.div>
  )
}
