import { useRef, useCallback } from 'react'
import { animate } from 'framer-motion'

type Sections = 'contact' | 'about' | 'projects' | 'skills'

export function useScrollTo() {
  const isScrollingRef = useRef(false)

  const scrollTo = useCallback((section: Sections) => {
    const element = document.getElementById(section)
    if (!element || isScrollingRef.current) return
    
    isScrollingRef.current = true
    
    const elementTop = element.getBoundingClientRect().top
    const startPosition = window.scrollY
    const targetPosition = startPosition + elementTop - 50
    
    animate(startPosition, targetPosition, {
      duration: 2,
      ease: [0.22, 0.61, 0.36, 1],
      onUpdate: (value) => {
        window.scrollTo(0, value)
      },
      onComplete: () => {
        isScrollingRef.current = false
      }
    })
  }, [])

  return {
    scrollTo,
  }
}

