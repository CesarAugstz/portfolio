'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Github, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { getInfo } from '@/info/info'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

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
              👋 Hey there!
            </span>
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            I&apos;m{' '}
            <span className="relative inline-block text-primary">
              Cesar
              <motion.div
                className="absolute -bottom-1 left-0 h-2 bg-primary/30 w-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            A passionate frontend developer who loves creating{' '}
            <span className="text-primary font-medium">beautiful</span>,{' '}
            <span className="text-primary font-medium">interactive</span>, and{' '}
            <span className="text-primary font-medium">user-friendly</span> web experiences.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg">
              <Link href="#projects">
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#contact">Contact Me</Link>
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
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link
                href={getInfo().linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
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
