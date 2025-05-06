"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "HTML/CSS", level: 95 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    category: "UI/UX",
    items: [
      { name: "Figma", level: 80 },
      { name: "Responsive Design", level: 90 },
      { name: "Animation", level: 85 },
      { name: "Accessibility", level: 80 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 75 },
      { name: "Express", level: 70 },
      { name: "MongoDB", level: 65 },
      { name: "Firebase", level: 80 },
    ],
  },
  {
    category: "Tools & Others",
    items: [
      { name: "Git", level: 90 },
      { name: "Webpack", level: 75 },
      { name: "Jest", level: 70 },
      { name: "CI/CD", level: 65 },
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
              I've developed a diverse set of skills throughout my career. Here's an overview of my technical expertise
              and proficiency levels.
            </p>
          </motion.div>

          <motion.div variants={containerVariants} className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div key={skillGroup.category} variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>{skillGroup.category}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {skillGroup.items.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" indicatorClassName="bg-primary" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Technologies I Work With</CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div variants={containerVariants} className="flex flex-wrap justify-center gap-4">
                  {[
                    "JavaScript",
                    "TypeScript",
                    "React",
                    "Next.js",
                    "Node.js",
                    "HTML5",
                    "CSS3",
                    "Tailwind CSS",
                    "Framer Motion",
                    "Redux",
                    "GraphQL",
                    "REST API",
                    "Git",
                    "GitHub",
                    "Figma",
                    "Jest",
                    "Webpack",
                    "Firebase",
                    "MongoDB",
                    "Vercel",
                  ].map((tech) => (
                    <motion.span
                      key={tech}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 bg-background rounded-full text-sm border"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
