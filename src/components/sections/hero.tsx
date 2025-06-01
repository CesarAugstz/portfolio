'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Github, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { getInfo } from '@/info/info'
import { useTranslations } from '@/hooks/useTranslations'
import { useScrollTo } from '@/hooks/use-scrollto'

function useHackerText(
  text: string,
  animationDelay: number = 0,
  duration: number = 1000,
) {
  const [displayText, setDisplayText] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
    let animationId: NodeJS.Timeout

    const startAnimation = () => {
      setIsAnimating(true)
      let iteration = 0
      const totalFrames = duration / 30
      const incrementPerFrame = text.length / totalFrames

      const animate = () => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (index < iteration) {
                return char
              }
              return chars[Math.floor(Math.random() * chars.length)]
            })
            .join(''),
        )

        if (iteration >= text.length) {
          setIsAnimating(false)
          return
        }

        iteration += incrementPerFrame
        animationId = setTimeout(animate, (iteration % 30) * 20)
      }

      animate()
    }

    const timer = setTimeout(startAnimation, animationDelay)

    return () => {
      clearTimeout(timer)
      clearTimeout(animationId)
    }
  }, [text, animationDelay, duration])

  return { displayText: displayText || text, isAnimating }
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { t } = useTranslations()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const { scrollTo } = useScrollTo()

  const { displayText: hackerName, isAnimating } = useHackerText(
    t('hero.name'),
    500,
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-bg"
    >
      <motion.div
        style={{ y, opacity }}
        className="container-width px-4 sm:px-6 lg:px-8 relative z-10 pt-20"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-2 text-lg font-medium rounded-full bg-primary/10 text-primary mb-4">
              {t('hero.greeting')}
            </span>
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            {t('hero.prename')}
            <span className="relative inline-block text-primary">
              <span
                className={`font-mono ${isAnimating ? 'text-primary-400' : ''}`}
              >
                {hackerName}
              </span>
              {isAnimating && (
                <motion.span
                  className="inline-block w-0.5 h-8 md:h-12 bg-primary-400 ml-1"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 0.8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'loop',
                  }}
                />
              )}
              <motion.div
                className="absolute -bottom-1 left-0 h-2 bg-primary/30 w-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 3, duration: 0.8 }}
              />
            </span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            {t('hero.description')}
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button onClick={() => scrollTo('projects')} size="lg">
              {t('hero.viewProjects')} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollTo('contact')}
            >
              {t('hero.contactMe')}
            </Button>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-4 mt-8"
          >
            <Button variant="ghost" size="icon" asChild>
              <Link
                href={getInfo().github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">{t('hero.github')}</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link
                href={getInfo().linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">{t('hero.linkedin')}</span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/5"
            initial={{
              x: Math.random() * 100 - 50 + '%',
              y: Math.random() * 100 - 50 + '%',
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: Math.random() * 100 - 50 + '%',
              y: Math.random() * 100 - 50 + '%',
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'reverse',
            }}
            style={{
              width: `${Math.random() * 400 + 100}px`,
              height: `${Math.random() * 400 + 100}px`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
          />
        ))}
      </div>
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'loop',
        }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary flex justify-center">
          <motion.div
            className="w-1 h-2 bg-primary rounded-full mt-2"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'loop',
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}
