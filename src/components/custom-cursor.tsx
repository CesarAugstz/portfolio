"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    const handleMouseDown = () => setCursorVariant("click")
    const handleMouseUp = () => setCursorVariant("default")
    const handleMouseEnter = () => setCursorVariant("hover")
    const handleMouseLeave = () => setCursorVariant("default")

    window.addEventListener("mousemove", mouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll("a, button, input, textarea, select, [role='button']")

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      window.removeEventListener("mousemove", mouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  // Only show custom cursor on desktop
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.innerWidth > 768)
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)

    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  if (!isDesktop) return null

  const variants = {
    default: {
      x: mousePosition.x,
      y: mousePosition.y,
    },
    hover: {
      x: mousePosition.x,
      y: mousePosition.y,
      scale: 1.5,
    },
    click: {
      x: mousePosition.x,
      y: mousePosition.y,
      scale: 0.8,
    },
  }

  const outlineVariants = {
    default: {
      x: mousePosition.x,
      y: mousePosition.y,
      transition: {
        type: "spring",
        mass: 0.3,
      },
    },
    hover: {
      x: mousePosition.x,
      y: mousePosition.y,
      scale: 1.5,
      transition: {
        type: "spring",
        mass: 0.3,
      },
    },
    click: {
      x: mousePosition.x,
      y: mousePosition.y,
      scale: 0.8,
      transition: {
        type: "spring",
        mass: 0.3,
      },
    },
  }

  return (
    <>
      <motion.div className="cursor-dot" variants={variants} animate={cursorVariant} />
      <motion.div className="cursor-outline" variants={outlineVariants} animate={cursorVariant} />
    </>
  )
}
