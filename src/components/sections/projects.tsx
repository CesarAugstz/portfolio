'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { ExternalLink, Github, Lightbulb } from 'lucide-react'
import Link from 'next/link'
import { getInfo } from '@/info/info'

const technologyIcons: Record<string, string> = {
  React: 'icon-[devicon--react]',
  'Next.js': 'icon-[devicon--nextjs]',
  'Tailwind CSS': 'icon-[devicon--tailwindcss]',
  PostgreSQL: 'icon-[devicon--postgresql]',
  Shadcn: 'icon-[simple-icons--shadcnui]',
  Zenstack: 'icon-[devicon--typescript]',
  MQTT: 'icon-[simple-icons--mqtt]',
  Tuya: 'icon-[devicon--javascript]',
  TypeScript: 'icon-[devicon--typescript]',
  JavaScript: 'icon-[devicon--javascript]',
  'Node.js': 'icon-[devicon--nodejs]',
  MongoDB: 'icon-[devicon--mongodb]',
  Docker: 'icon-[devicon--docker]',
  Git: 'icon-[devicon--git]',
  'Vue.js': 'icon-[devicon--vuejs]',
  Angular: 'icon-[devicon--angularjs]',
  NestJS: 'icon-[devicon--nestjs]',
  Prisma: 'icon-[devicon--prisma]',
  Firebase: 'icon-[devicon--firebase]',
  AWS: 'icon-[devicon--amazonwebservices-wordmark]',
  Azure: 'icon-[devicon--azure]',
  Express: 'icon-[devicon--express]',
  Sass: 'icon-[devicon--sass]',
  CSS3: 'icon-[devicon--css3]',
  HTML5: 'icon-[devicon--html5]',
}

const projects = [
  {
    id: 1,
    title: 'College Website',
    description:
      'A comprehensive responsive website for a college featuring modern design, student portal, course management, and administrative tools. Built with cutting-edge technologies for optimal performance and user experience.',
    images: [
      '/placeholder.svg?height=400&width=600&text=College+Homepage',
      '/placeholder.svg?height=400&width=600&text=Student+Portal',
      '/placeholder.svg?height=400&width=600&text=Course+Catalog',
      '/placeholder.svg?height=400&width=600&text=Admin+Dashboard',
    ],
    tags: [
      'React',
      'Next.js',
      'Tailwind CSS',
      'Zenstack',
      'PostgreSQL',
      'Shadcn',
      'TypeScript',
    ],
    demoUrl: 'https://fct-ufmt.vercel.app',
    githubUrl: 'https://github.com/cesaraugstz/fct-ufmt',
  },
  {
    id: 2,
    title: 'Smart Devices Manager',
    description:
      'An advanced IoT management platform for controlling and monitoring smart devices through MQTT and Tuya protocols. Features real-time device status, automation rules, and comprehensive analytics dashboard.',
    images: [
      '/placeholder.svg?height=400&width=600&text=Device+Dashboard',
      '/placeholder.svg?height=400&width=600&text=Device+Control',
      '/placeholder.svg?height=400&width=600&text=Analytics+View',
      '/placeholder.svg?height=400&width=600&text=Automation+Rules',
    ],
    tags: [
      'React',
      'Next.js',
      'Tailwind CSS',
      'Shadcn',
      'MQTT',
      'Tuya',
      'Zenstack',
      'PostgreSQL',
      'TypeScript',
    ],
    demoUrl: 'https://cgl-connect.vercel.app',
    githubUrl: 'https://github.com/cesaraugstz/cgl-connect',
  },
]

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const cardVariants = {
    initial: { scale: 1, rotateY: 0 },
    hover: {
      scale: 1.02,
      rotateY: 2,
      boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
      transition: { duration: 0.3 },
    },
  }

  const techBadgeVariants = {
    initial: {
      color: 'var(--secondary-foreground)',
      scale: 1,
    },
    hover: {
      color: 'var(--primary-foreground)',
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  }

  return (
    <section
      id="projects"
      className="section-padding bg-gradient-to-br from-background via-muted/20 to-background py-20"
    >
      <div className="container-width">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {/* Header Section */}
          <motion.div
            variants={itemVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block p-3 bg-primary/10 rounded-full mb-6">
              <Lightbulb className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Explore my portfolio of innovative solutions. Each project
              represents a unique challenge solved with modern technologies,
              thoughtful design, and attention to detail.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  custom={index}
                  className="group"
                >
                  <motion.div
                    variants={cardVariants}
                    initial="initial"
                    whileHover="hover"
                    className="h-full"
                  >
                    <Card className="overflow-hidden h-full flex flex-col bg-gradient-to-br from-card to-card/50 border-2 hover:border-primary/50 transition-all duration-500 shadow-lg hover:shadow-2xl">
                      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                        <Carousel className="w-full h-full">
                          <CarouselContent>
                            {project.images.map((image, imageIndex) => (
                              <CarouselItem key={imageIndex}>
                                <div className="relative w-full h-full">
                                  <Image
                                    src={image}
                                    alt={`${project.title} - Image ${
                                      imageIndex + 1
                                    }`}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious className="left-2 bg-background/80 hover:bg-background border-0 shadow-lg" />
                          <CarouselNext className="right-2 bg-background/80 hover:bg-background border-0 shadow-lg" />
                        </Carousel>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-grow p-6">
                        <CardHeader className="p-0 pb-4">
                          <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                            {project.title}
                          </CardTitle>
                          <CardDescription className="text-muted-foreground leading-relaxed">
                            {project.description}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="flex-grow p-0 pb-6">
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                              <motion.div
                                key={tag}
                                variants={techBadgeVariants}
                                initial="initial"
                                whileHover="hover"
                                className="relative"
                              >
                                <Badge
                                  variant="secondary"
                                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium cursor-pointer transition-all duration-200"
                                >
                                  {technologyIcons[tag] && (
                                    <span
                                      className={`${technologyIcons[tag]} w-3 h-3`}
                                    />
                                  )}
                                  {tag}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>

                        <CardFooter className="p-0 flex justify-between gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="flex-1"
                          >
                            <Link
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="mr-2 h-4 w-4" />
                              Source Code
                            </Link>
                          </Button>
                          <Button size="sm" asChild className="flex-1">
                            <Link
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Live Demo
                            </Link>
                          </Button>
                        </CardFooter>
                      </div>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 md:p-12 text-center border border-primary/20"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Interested in My Work?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
              These projects represent just a glimpse of what I can create. I'm
              always excited to take on new challenges and bring innovative
              ideas to life. Let&apos;s collaborate on your next project!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button size="lg" asChild className="px-8 py-3">
                  <Link
                    href={getInfo().github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    Explore All Projects
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="px-8 py-3"
                >
                  <Link href="#contact">
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Get In Touch
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
