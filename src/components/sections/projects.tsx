'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
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
import { ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'
import { getInfo } from '@/info/info'

const projects = [
  {
    id: 1,
    title: 'College website',
    description:
      'A responsive website for a college, built with Next.js and Tailwind CSS.',
    image: '/placeholder.svg?height=400&width=600',
    tags: [
      'React',
      'Next.js',
      'Tailwind CSS',
      'Zenstack',
      'PostgreSQL',
      'Shadcn',
    ],
    demoUrl: 'https://fct-ufmt.vercel.app',
    githubUrl: 'https://github.com/cesaraugstz/fct-ufmt',
  },
  {
    id: 2,
    title: 'Smart Devices Manager',
    description: 'A web application for managing smart devices, mqtt and tuya',
    image: '/placeholder.svg?height=400&width=600',
    tags: [
      'React',
      'Next.js',
      'Tailwind CSS',
      'Shadcn',
      'MQTT',
      'Tuya',
      'Zenstack',
      'PostgreSQL',
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
    <section id="projects" className="section-padding my-4 py-4">
      <div className="container-width">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          <motion.div
            variants={itemVariants}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              My Projects
            </h2>
            <p className="text-muted-foreground">
              Here are some of my recent projects. Each one was built with a
              focus on solving real problems with elegant solutions.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-6 lg:gap-8"
          >
            {projects.map(project => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={project.image || '/placeholder.svg'}
                      alt={project.title}
                      width={200}
                      height={200}
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" /> Code
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <Button variant="outline" asChild>
              <Link
                href={getInfo().github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" /> View More on GitHub
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
