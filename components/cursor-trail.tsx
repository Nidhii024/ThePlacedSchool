"use client"

import { useEffect, useRef } from "react"

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    // Mouse position
    const mouse = { x: 0, y: 0 }
    const lastMouse = { x: 0, y: 0 }

    // Trail points
    const trail: {
      x: number
      y: number
      age: number
      width: number
    }[] = []

    // Update mouse position
    const handleMouseMove = (e: MouseEvent) => {
      lastMouse.x = mouse.x
      lastMouse.y = mouse.y
      mouse.x = e.clientX
      mouse.y = e.clientY

      // Add trail point
      const distance = Math.sqrt(Math.pow(mouse.x - lastMouse.x, 2) + Math.pow(mouse.y - lastMouse.y, 2))

      if (distance > 5) {
        trail.push({
          x: mouse.x,
          y: mouse.y,
          age: 0,
          width: Math.min(distance * 0.3, 10),
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw trail
      for (let i = 0; i < trail.length; i++) {
        const point = trail[i]
        point.age++

        if (point.age > 50) {
          trail.splice(i, 1)
          i--
          continue
        }

        // Calculate opacity based on age
        const opacity = 1 - point.age / 50

        // Draw line if there's a next point
        if (i < trail.length - 1) {
          const nextPoint = trail[i + 1]

          ctx.beginPath()
          ctx.moveTo(point.x, point.y)
          ctx.lineTo(nextPoint.x, nextPoint.y)

          // Create gradient for the line
          const gradient = ctx.createLinearGradient(point.x, point.y, nextPoint.x, nextPoint.y)
          gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.8})`)
          gradient.addColorStop(1, `rgba(200, 225, 255, ${opacity * 0.5})`)

          ctx.strokeStyle = gradient
          ctx.lineWidth = point.width * (1 - point.age / 50)
          ctx.lineCap = "round"
          ctx.stroke()
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasSize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-50" />
}
