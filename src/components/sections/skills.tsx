'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useTranslations } from '@/hooks/useTranslations'
import { useIsMobile } from '@/components/ui/use-mobile'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import { Badge } from '@/components/ui/badge'
import {
  LucideCode,
  LucideFramer,
  LucideDatabase,
  LucideZap,
  LucideBrain,
  LucideGraduationCap,
  LucideRocket,
  LucideStar,
} from 'lucide-react'

const skillCategories = [
  {
    category: 'Languages',
    translationKey: 'languages',
    icon: <LucideCode className="h-8 w-8" />,
    color: 'from-blue-500 to-cyan-500',
    items: [
      {
        translationKey: 'javascript',
        icon: 'icon-[devicon--javascript]',
      },
      {
        translationKey: 'typescript',
        icon: 'icon-[devicon--typescript]',
      },
      {
        translationKey: 'csharp',
        icon: 'icon-[devicon--csharp]',
      },
      {
        translationKey: 'sql',
        icon: 'icon-[devicon--sqldeveloper]',
      },
    ],
  },
  {
    category: 'Frontend',
    translationKey: 'frontend',
    icon: <LucideFramer className="h-8 w-8 " />,
    color: 'from-green-500 to-emerald-500',
    items: [
      {
        translationKey: 'react',
        icon: 'icon-[devicon--react]',
      },
      {
        translationKey: 'vuejs',
        icon: 'icon-[devicon--vuejs]',
      },
      {
        translationKey: 'angular',
        icon: 'icon-[devicon--angularjs]',
      },
      {
        translationKey: 'nestjs',
        icon: 'icon-[devicon--nestjs]',
      },
      {
        translationKey: 'entityframework',
        icon: 'icon-[devicon--dotnetcore]',
      },
    ],
  },
  {
    category: 'Backend',
    translationKey: 'backend',
    icon: <LucideDatabase className="h-8 w-8 " />,
    color: 'from-orange-500 to-red-500',
    items: [
      {
        translationKey: 'mongodb',
        icon: 'icon-[devicon--mongodb]',
      },
      {
        translationKey: 'postgresql',
        icon: 'icon-[devicon--postgresql]',
      },
      {
        translationKey: 'mssql',
        icon: 'icon-[devicon--microsoftsqlserver-wordmark]',
      },
      {
        translationKey: 'prisma',
        icon: 'icon-[devicon--prisma]',
      },
    ],
  },
  {
    category: 'Tools & DevOps',
    translationKey: 'tools',
    icon: <LucideZap className="h-8 w-8 " />,
    color: 'from-purple-500 to-pink-500',
    items: [
      {
        translationKey: 'git',
        icon: 'icon-[devicon--git]',
      },
      {
        translationKey: 'docker',
        icon: 'icon-[devicon--docker]',
      },
      {
        translationKey: 'cicd',
        icon: 'icon-[devicon--azuredevops]',
      },
      {
        translationKey: 'azure',
        icon: 'icon-[devicon--azure]',
      },
      {
        translationKey: 'linux',
        icon: 'icon-[devicon--linux]',
      },
      {
        translationKey: 'vim',
        icon: 'icon-[devicon--vim]',
      },
    ],
  },
]

const featuredTechnologies = [
  { name: 'React', icon: 'icon-[devicon--react]', category: 'Frontend' },
  {
    name: 'TypeScript',
    icon: 'icon-[devicon--typescript]',
    category: 'Language',
  },
  { name: 'Node.js', icon: 'icon-[devicon--nodejs]', category: 'Backend' },
  {
    name: 'PostgreSQL',
    icon: 'icon-[devicon--postgresql]',
    category: 'Database',
  },
  { name: 'Docker', icon: 'icon-[devicon--docker]', category: 'DevOps' },
  { name: 'Git', icon: 'icon-[devicon--git]', category: 'Tools' },
  { name: 'Azure', icon: 'icon-[devicon--azure]', category: 'Cloud' },
  { name: 'NestJS', icon: 'icon-[devicon--nestjs]', category: 'Backend' },
]

const projects = [
  {
    name: 'socialSecurity',
    technologies: [
      'React',
      '.NET 9',
      'PostgreSQL',
      'Entity Framework',
      'TDD',
      'CQRS',
      'Docker Compose',
    ],
  },
  {
    name: 'recertification',
    technologies: ['Vue.js', 'NestJS', 'MongoDB', 'Prisma ORM'],
  },
  {
    name: 'chatbot',
    technologies: ['Chatwoot', 'EvolutionAPI', 'N8N', 'Typebot', 'Docker'],
  },
]

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.05 })
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const isMobile = useIsMobile()
  const { t } = useTranslations()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.05 : 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  const cardVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  }

  const techVariants = {
    initial: { scale: 1, rotateY: 0 },
    hover: {
      scale: 1.1,
      rotateY: 10,
      transition: { duration: 0.2 },
    },
  }

  return (
    <section
      id="skills"
      className="relative section-padding bg-gradient-to-br from-background via-muted/20 to-background my-4 py-20 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="container-width relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-20"
        >
          <motion.div
            variants={itemVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block p-3 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full mb-6">
              <LucideBrain className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t('skills.title')}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t('skills.subtitle')}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                <LucideRocket className="h-6 w-6 text-primary" />
                {t('skills.featuredTechnologies.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('skills.featuredTechnologies.subtitle')}
              </p>
            </div>

            <Carousel
              className="w-full max-w-5xl mx-auto"
              opts={{ align: 'start', loop: true }}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {featuredTechnologies.map(tech => (
                  <CarouselItem
                    key={tech.name}
                    className="pl-2 md:pl-4 basis-1/3 md:basis-1/4 lg:basis-1/6"
                  >
                    <motion.div
                      variants={techVariants}
                      initial="initial"
                      whileHover="hover"
                      className="p-1 my-2 mx-1"
                    >
                      <Card className="border-2 hover:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm">
                        <CardContent className="flex flex-col items-center justify-center p-6 space-y-3">
                          <div className="w-12 h-12 flex items-center justify-center">
                            <span className={`${tech.icon} text-4xl`} />
                          </div>
                          <div className="text-center">
                            <p className="font-medium text-sm">{tech.name}</p>
                            <Badge variant="secondary" className="text-xs mt-1">
                              {tech.category}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </motion.div>

          <div className="space-y-12">
            <motion.div variants={itemVariants} className="text-center">
              <h3 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                <LucideGraduationCap className="h-7 w-7 text-primary" />
                {t('skills.technicalSkills.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('skills.technicalSkills.subtitle')}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4 pb-8"
            >
              {skillCategories.map(category => (
                <motion.button
                  key={category.category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    setActiveCategory(
                      activeCategory === category.category
                        ? null
                        : category.category,
                    )
                  }
                  className={`flex items-center gap-3 cursor-pointer px-6 py-3 rounded-full font-medium transition-all duration-300 border-2
                    ${
                      activeCategory === category.category
                        ? 'bg-primary text-primary-foreground  border-primary shadow-lg'
                        : 'bg-background/50 backdrop-blur-sm border-border hover:border-primary hover:bg-primary/5'
                    }`}
                >
                  <span
                    className={
                      activeCategory === category.category
                        ? 'text-primary-foreground '
                        : 'text-primary'
                    }
                  >
                    {category.icon}
                  </span>
                  <span>
                    {t(`skills.categories.${category.translationKey}.title`)}
                  </span>
                </motion.button>
              ))}
            </motion.div>

            <AnimatePresence mode="sync">
              <motion.div
                key={activeCategory || 'all'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 gap-8"
              >
                {(activeCategory
                  ? skillCategories.filter(c => c.category === activeCategory)
                  : skillCategories
                ).map(skillGroup => (
                  <motion.div
                    key={skillGroup.category}
                    variants={cardVariants}
                    initial="initial"
                    whileHover="hover"
                    className="h-full px-2"
                  >
                    <Card className="h-full border-2 hover:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm overflow-hidden">
                      <div
                        className={`h-2 bg-gradient-to-r ${skillGroup.color}`}
                      ></div>

                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-3">
                          {skillGroup.icon}
                          <CardTitle className="text-xl">
                            {t(
                              `skills.categories.${skillGroup.translationKey}.title`,
                            )}
                          </CardTitle>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          {t(
                            `skills.categories.${skillGroup.translationKey}.description`,
                          )}
                        </p>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {skillGroup.items.map((skill, index) => (
                          <motion.div
                            key={skill.translationKey}
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity: 1,
                              transition: {
                                delay: isMobile ? 0.1 : index * 0.05,
                              },
                            }}
                            whileHover={
                              !isMobile
                                ? {
                                    backgroundColor:
                                      'var(--primary-foreground)',
                                    borderColor: 'var(--primary)',
                                    scale: 1.02,
                                  }
                                : undefined
                            }
                            onHoverStart={() =>
                              !isMobile && setHoveredSkill(skill.translationKey)
                            }
                            onHoverEnd={() =>
                              !isMobile && setHoveredSkill(null)
                            }
                            className="relative p-4 rounded-lg border bg-background/30 hover:bg-background/60 transition-all duration-300 group"
                          >
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                                {skill.icon ? (
                                  <span className={`${skill.icon} text-2xl`} />
                                ) : (
                                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold">
                                    {t(
                                      `skills.items.${skill.translationKey}.name`,
                                    ).charAt(0)}
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-lg mb-2">
                                  {t(
                                    `skills.items.${skill.translationKey}.name`,
                                  )}
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {t(
                                    `skills.items.${skill.translationKey}.description`,
                                  )}
                                </p>
                              </div>
                            </div>

                            <AnimatePresence>
                              {hoveredSkill === skill.translationKey && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  transition={{ duration: 0.2 }}
                                  className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border-primary/20 border"
                                />
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div variants={itemVariants} className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                <LucideStar className="h-7 w-7 text-primary" />
                {t('skills.projectExperience.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('skills.projectExperience.subtitle')}
              </p>
            </div>

            <Carousel
              className="w-full max-w-6xl mx-auto"
              opts={{ align: 'start', loop: true }}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {projects.map((project, index) => (
                  <CarouselItem
                    key={project.name}
                    className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                  >
                    <motion.div
                      variants={cardVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap={{ scale: 0.98 }}
                      custom={index}
                      className="h-full p-1"
                    >
                      <Card className="h-full border-2 hover:border-primary/50 transition-all duration-300 overflow-hidden bg-background/50 backdrop-blur-sm">
                        <div className="h-3 bg-gradient-to-r from-primary via-primary/80 to-primary/60"></div>
                        <CardHeader className="pb-4">
                          <CardTitle className="text-xl leading-tight">
                            {t(
                              `skills.projectDescriptions.${project.name}.name`,
                            )}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {t(
                              `skills.projectDescriptions.${project.name}.description`,
                            )}
                          </p>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map(tech => (
                              <Badge
                                key={tech}
                                variant="secondary"
                                className="text-xs font-medium hover:bg-primary/20 transition-colors"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-2">
                {t('skills.areasOfInterest.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('skills.areasOfInterest.subtitle')}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {(t('skills.interests') as unknown as string[]).map(
                (interest: string, index: number) => (
                  <motion.div
                    key={interest}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-foreground)',
                      y: -5,
                    }}
                    custom={index}
                    drag
                    dragConstraints={{
                      left: -100,
                      right: 100,
                      top: -100,
                      bottom: 100,
                    }}
                    className="px-5 py-3 bg-background/50 backdrop-blur-sm rounded-full text-sm font-medium border-2 border-border hover:border-primary cursor-grab active:cursor-grabbing transition-all duration-300"
                  >
                    {interest}
                  </motion.div>
                ),
              )}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-2xl p-8 md:p-12 text-center border border-primary/20"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary rounded-full translate-x-16 translate-y-16"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {t('skills.callToAction.title')}
              </h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                {t('skills.callToAction.description')}
              </p>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t('skills.callToAction.button')}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
