"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const skills = [
  {
    category: "Languages",
    items: [
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "C#" },
      { name: "SQL" },
    ],
  },
  {
    category: "Frameworks",
    items: [
      { name: "React" },
      { name: "VueJS" },
      { name: "AngularJS" },
      { name: "NestJS" },
      { name: "Entity Framework" },
    ],
  },
  {
    category: "Tools & Platforms",
    items: [
      { name: "Git" },
      { name: "Docker" },
      { name: "CI/CD" },
      { name: "Azure" },
      { name: "Linux" },
      { name: "Vim" },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "MongoDB" },
      { name: "PostgreSQL" },
      { name: "MSSQL" },
      { name: "Prisma ORM" },
    ],
  },
]

export default function Skills() {
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
    <section id="skills" className="section-padding bg-muted/30 my-4 py-4">
      <div className="container-width">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Skills & Expertise</h2>
            <p className="text-muted-foreground">
              I've developed a diverse set of skills throughout my career in both front-end and back-end development.
              Here's an overview of my technical expertise across different domains.
            </p>
          </motion.div>

          <motion.div variants={containerVariants} className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {skills.map((skillGroup) => (
              <motion.div key={skillGroup.category} variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>{skillGroup.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill) => (
                        <span 
                          key={skill.name} 
                          className="px-3 py-1.5 bg-background rounded-full text-sm border hover:border-primary transition-colors"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Areas of Interest</CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div variants={containerVariants} className="flex flex-wrap justify-center gap-4">
                  {[
                    "Full Stack Development",
                    "Software Architecture",
                    "Performance Optimization",
                    "Technical Innovation",
                    "Back-End Development",
                    "Front-End Development",
                    "DevOps",
                    "Test-Driven Development",
                    "CQRS Architecture",
                    "BFF Pattern",
                  ].map((interest) => (
                    <motion.span
                      key={interest}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 bg-background rounded-full text-sm border hover:bg-muted/50 transition-colors"
                    >
                      {interest}
                    </motion.span>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Project Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Social Security Management System</h3>
                    <div className="flex flex-wrap gap-2">
                      {["React", ".NET 9", "PostgreSQL", "Entity Framework", "TDD", "CQRS", "Docker Compose"].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-background rounded-full text-xs border">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Online Registrant Recertification System</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Vue.js", "NestJS", "MongoDB", "Prisma ORM"].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-background rounded-full text-xs border">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Chatbot System</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Chatwoot", "EvolutionAPI", "N8N", "Typebot", "Docker"].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-background rounded-full text-xs border">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
