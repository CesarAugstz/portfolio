"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "@/hooks/useTranslations"

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { t } = useTranslations()

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
    <section id="about" className="section-padding bg-muted/30 py-4 my-4">
      <div className="container-width">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="relative">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="/images/profile.png"
                alt="Cesar Filho"
                width={500}
                height={500}
                className="object-cover size-full"
                priority
              />
            </div>
            <motion.div
              className="absolute -bottom-6 -right-0 bg-background p-4 rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="text-center">
                <p className="text-4xl font-bold">3+</p>
                <p className="text-sm text-muted-foreground">{t('about.yearsExperience')}</p>
              </div>
            </motion.div>
          </motion.div>

          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold tracking-tight mb-2">{t('about.title')}</h2>
              <div className="h-1 w-20 bg-primary rounded-full mb-6"></div>
            </motion.div>

            <motion.p variants={itemVariants} className="text-muted-foreground">
              {t('about.description')}
            </motion.p>

            <motion.p variants={itemVariants} className="text-muted-foreground">
              I excel in performance optimization, architecture definition, and adoption of development best practices. My skills span across
              multiple frameworks including React, VueJS, AngularJS, NestJS, and Entity Framework, allowing me to adapt to various technology stacks.
            </motion.p>

            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-3">{t('about.education')}</h3>
              <ul className="space-y-4">
                <li className="border-l-2 border-primary pl-4 py-1">
                  <p className="font-medium">Software Developer</p>
                  <p className="text-sm text-muted-foreground">Agenda Assessoria Planejamento e Informática LTDA • July 2022 - Present</p>
                </li>
                <li className="border-l-2 border-muted pl-4 py-1">
                  <p className="font-medium">IT Intern</p>
                  <p className="text-sm text-muted-foreground">Help Vida Home Care e Remoção EIRELI • October 2021 - July 2022</p>
                </li>
                <li className="border-l-2 border-muted pl-4 py-1">
                  <p className="font-medium">{t('about.degree')}</p>
                  <p className="text-sm text-muted-foreground">{t('about.university')}</p>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-2 flex justify-center">
              <Button asChild className="flex">
                <Link href="/resume.pdf" target="_blank">
                  <FileText className="mr-2 h-4 w-4" /> {t('about.downloadResume')}
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
