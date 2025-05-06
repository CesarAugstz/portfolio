"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideCode, LucideFramer, LucideDatabase,  LucideZap, LucideBrain } from "lucide-react"

// Skill data with icons and descriptions
const skillCategories = [
  {
    category: "Languages",
    icon: <LucideCode className="h-8 w-8 text-primary" />,
    description: "Programming languages I've mastered",
    items: [
      { 
        name: "JavaScript", 
        icon: "/icons/javascript.svg",
        description: "Modern ES6+, async programming, functional concepts"
      },
      { 
        name: "TypeScript", 
        icon: "/icons/typescript.svg",
        description: "Type-safe code, interfaces, generics, utility types"
      },
      { 
        name: "C#", 
        icon: "/icons/csharp.svg",
        description: "Object-oriented programming, LINQ, async/await"
      },
      { 
        name: "SQL", 
        icon: "/icons/sql.svg",
        description: "Complex queries, joins, stored procedures, optimization"
      },
    ],
  },
  {
    category: "Frameworks",
    icon: <LucideFramer className="h-8 w-8 text-primary" />,
    description: "Libraries and frameworks I build with",
    items: [
      { 
        name: "React", 
        icon: "/icons/react.svg",
        description: "Hooks, context, custom hooks, performance optimization"
      },
      { 
        name: "VueJS", 
        icon: "/icons/vue.svg",
        description: "Component architecture, Vuex, Vue Router"
      },
      { 
        name: "AngularJS", 
        icon: "/icons/angular.svg",
        description: "Component-based architecture, services, dependency injection"
      },
      { 
        name: "NestJS", 
        icon: "/icons/nestjs.svg",
        description: "Modular architecture, dependency injection, decorators"
      },
      { 
        name: "Entity Framework", 
        icon: "/icons/entity-framework.svg",
        description: "ORM, code-first approach, migrations, LINQ"
      },
    ],
  },
  {
    category: "Tools & Platforms",
    icon: <LucideZap className="h-8 w-8 text-primary" />,
    description: "Tools that power my development workflow",
    items: [
      { 
        name: "Git", 
        icon: "/icons/git.svg",
        description: "Version control, branching strategies, collaborative workflow"
      },
      { 
        name: "Docker", 
        icon: "/icons/docker.svg",
        description: "Containerization, multi-container apps, Docker Compose"
      },
      { 
        name: "CI/CD", 
        icon: "/icons/cicd.svg",
        description: "Automated testing, deployment pipelines, GitLab/GitHub Actions"
      },
      { 
        name: "Azure", 
        icon: "/icons/azure.svg",
        description: "Cloud services, App Service, Azure Functions, Azure DevOps"
      },
      { 
        name: "Linux", 
        icon: "/icons/linux.svg",
        description: "Server management, bash scripting, service configuration"
      },
      { 
        name: "Vim", 
        icon: "/icons/vim.svg",
        description: "Advanced text editing, custom configurations, macros"
      },
    ],
  },
  {
    category: "Databases",
    icon: <LucideDatabase className="h-8 w-8 text-primary" />,
    description: "Database systems I'm proficient with",
    items: [
      { 
        name: "MongoDB", 
        icon: "/icons/mongodb.svg",
        description: "NoSQL, aggregation pipeline, indexing strategies"
      },
      { 
        name: "PostgreSQL", 
        icon: "/icons/postgresql.svg",
        description: "Relational DB, advanced queries, performance tuning"
      },
      { 
        name: "MSSQL", 
        icon: "/icons/mssql.svg",
        description: "T-SQL, stored procedures, triggers, performance optimization"
      },
      { 
        name: "Prisma ORM", 
        icon: "/icons/prisma.svg",
        description: "Type-safe database access, migrations, relations"
      },
    ],
  },
]

const projects = [
  {
    name: "Social Security Management System",
    description: "A comprehensive system for managing pension and benefits using modern architecture",
    technologies: ["React", ".NET 9", "PostgreSQL", "Entity Framework", "TDD", "CQRS", "Docker Compose"]
  },
  {
    name: "Online Registrant Recertification System",
    description: "Web platform for processing and verifying user recertifications with secure authentication",
    technologies: ["Vue.js", "NestJS", "MongoDB", "Prisma ORM"]
  },
  {
    name: "Chatbot System",
    description: "Automated communication system with integration capabilities and workflow automation",
    technologies: ["Chatwoot", "EvolutionAPI", "N8N", "Typebot", "Docker"]
  }
]

const interests = [
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
]

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const cardVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" },
  }

  const skillVariants = {
    initial: { 
      backgroundColor: "var(--background)", 
      borderColor: "var(--border)",
      scale: 1,
    },
    hover: { 
      backgroundColor: "var(--primary-foreground)", 
      borderColor: "var(--primary)",
      scale: 1.05,
      transition: { duration: 0.2 }
    },
  }

  return (
    <section id="skills" className="section-padding bg-muted/30 my-4 py-16">
      <div className="container-width">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16"
        >
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
            <div className="inline-block p-2 bg-primary/10 rounded-full mb-4">
              <LucideBrain className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-4xl font-bold tracking-tight mb-4">Skills & Expertise</h2>
            <p className="text-muted-foreground text-lg">
              I've developed a diverse set of skills throughout my career in both front-end and back-end development.
              My technical toolkit enables me to build robust, scalable, and elegant solutions.
            </p>
          </motion.div>

          {/* Skills Section with Interactive Tabs */}
          <div className="space-y-12">
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4 pb-6"
            >
              {skillCategories.map((category) => (
                <motion.button
                  key={category.category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveCategory(
                    activeCategory === category.category ? null : category.category
                  )}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full 
                    ${activeCategory === category.category 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-background border hover:border-primary"} 
                    transition-all duration-300`}
                >
                  <span className={activeCategory === category.category ? "text-primary-foreground" : "text-primary"}>
                    {category.icon}
                  </span>
                  <span>{category.category}</span>
                </motion.button>
              ))}
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory || "all"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 gap-6 lg:gap-8"
              >
                {(activeCategory 
                  ? skillCategories.filter(c => c.category === activeCategory) 
                  : skillCategories
                ).map((skillGroup) => (
                  <motion.div 
                    key={skillGroup.category}
                    variants={cardVariants}
                    initial="initial"
                    whileHover="hover"
                    className="h-full"
                  >
                    <Card className="h-full border-2 hover:border-primary/50 transition-all duration-300">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          {skillGroup.icon}
                          <CardTitle>{skillGroup.category}</CardTitle>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{skillGroup.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-3">
                          {skillGroup.items.map((skill) => (
                            <motion.div
                              key={skill.name}
                              variants={skillVariants}
                              initial="initial"
                              whileHover="hover"
                              onHoverStart={() => setHoveredSkill(skill.name)}
                              onHoverEnd={() => setHoveredSkill(null)}
                              className="relative px-3 py-2 rounded-full text-sm border group transition-all duration-300"
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 relative">
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    {/* This would be an actual image in production with proper paths */}
                                    <div className="w-4 h-4 bg-primary/20 rounded-full flex items-center justify-center text-xs">
                                      {skill.name.charAt(0)}
                                    </div>
                                  </div>
                                </div>
                                <span>{skill.name}</span>
                              </div>
                              
                              {/* Tooltip on hover */}
                              <AnimatePresence>
                                {hoveredSkill === skill.name && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute left-0 right-0 -bottom-16 z-10 bg-background shadow-lg rounded-lg p-3 text-xs"
                                  >
                                    {skill.description}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Project Experience Section - Interactive cards */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-center mb-8">Project Experience</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.name}
                  variants={cardVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  custom={index}
                >
                  <Card className="h-full border-2 hover:border-primary/50 transition-all duration-300 overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-primary to-primary/60"></div>
                    <CardHeader>
                      <CardTitle className="text-xl">{project.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span 
                            key={tech} 
                            className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Areas of Interest - Interactive floating bubbles */}
          <motion.div variants={itemVariants} className="py-8">
            <h3 className="text-2xl font-bold text-center mb-8">Areas of Interest</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {interests.map((interest, index) => (
                <motion.div
                  key={interest}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.1, 
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)" 
                  }}
                  custom={index}
                  drag
                  dragConstraints={{ left: -10, right: 10, top: -10, bottom: 10 }}
                  className="px-4 py-2 bg-background rounded-full text-sm font-medium border cursor-grab active:cursor-grabbing"
                >
                  {interest}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call-to-action */}
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 text-center mt-12"
          >
            <h3 className="text-2xl font-bold mb-4">Let's Build Something Amazing Together</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              My diverse skill set and experience enable me to tackle complex problems and deliver elegant solutions.
              I'm always looking for new challenges and opportunities to expand my expertise.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium"
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
