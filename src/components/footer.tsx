'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'
import { getInfo } from '@/info/info'

export default function Footer() {
  const currentYear = new Date().getFullYear()

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
      <div className="container-width px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h3 className="text-lg font-semibold">Portfolio</h3>
            <p className="text-sm text-muted-foreground">
              A showcase of my projects and skills as a developer.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h3 className="text-lg font-semibold">Links</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map(item => (
                <li key={item}>
                  <Link
                    href={`/#${item.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
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
            <h3 className="text-lg font-semibold">Contact</h3>
            <address className="not-italic text-sm text-muted-foreground space-y-2">
              <p>dev.caugustoaf@gmail.com</p>
              <p>(65) 9 9256-0242</p>
            </address>
          </motion.div>

          <motion.div
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h3 className="text-lg font-semibold">Social</h3>
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
          <p>&copy; {currentYear} Portfolio. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
