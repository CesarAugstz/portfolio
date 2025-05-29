'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'
import { getInfo } from '@/info/info'
import { useTranslations } from '@/hooks/useTranslations'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { t } = useTranslations()

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      href: getInfo().github,
      label: 'GitHub',
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: getInfo().linkedin,
      label: 'LinkedIn',
    },
    {
      icon: <Mail className="h-5 w-5" />,
      href: getInfo().mailto,
      label: 'Email',
    },
  ]

  const navItems = [
    { name: t("navigation.home"), path: "/" },
    { name: t("navigation.about"), path: "/#about" },
    { name: t("navigation.projects"), path: "/#projects" },
    { name: t("navigation.skills"), path: "/#skills" },
    { name: t("navigation.contact"), path: "/#contact" },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <footer className="border-t bg-muted/30">
      <div className="container m-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:justify-items-end">
          <motion.div
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h3 className="text-lg font-semibold">{t("footer.portfolio.title")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("footer.portfolio.description")}
            </p>
          </motion.div>

          <motion.div
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h3 className="text-lg font-semibold">{t("footer.links.title")}</h3>
            <ul className="space-y-2">
              {navItems.map((navItem) => (
                <li key={navItem.name as string}>
                  <Link
                    href={navItem.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {navItem.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h3 className="text-lg font-semibold">{t("footer.contact.title")}</h3>
            <address className="not-italic text-sm text-muted-foreground space-y-2">
              <p>{t("footer.contact.email")}</p>
              <p>{t("footer.contact.phone")}</p>
            </address>
          </motion.div>

          <motion.div
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h3 className="text-lg font-semibold">{t("footer.social.title")}</h3>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex space-x-4"
            >
              {socialLinks.map(link => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  variants={item}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground"
        >
          <p>&copy; {currentYear} {t("navigation.portfolio")}. {t("footer.copyright")}</p>
        </motion.div>
      </div>
    </footer>
  )
}
