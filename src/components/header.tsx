'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useTranslations } from '@/hooks/useTranslations'
import { useScrollTo } from '@/hooks/use-scrollto'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { t } = useTranslations()
  const { scrollTo } = useScrollTo()

  const navItems = [
    { name: t('navigation.home'), onClick: () => scrollTo('home') },
    { name: t('navigation.about'), onClick: () => scrollTo('about') },
    { name: t('navigation.projects'), onClick: () => scrollTo('projects') },
    { name: t('navigation.skills'), onClick: () => scrollTo('skills') },
    { name: t('navigation.contact'), onClick: () => scrollTo('contact') },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-1 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container-width px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-tighter relative"
          >
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              {t('navigation.portfolio')}
            </motion.span>
            <motion.div
              className="absolute -bottom-1 left-0 h-1 bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item, i) => (
              <motion.div
                key={item.name as string}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
              >
                <div
                  onClick={item.onClick}
                  className={`text-sm font-medium transition-colors hover:text-primary text-muted-foreground cursor-pointer`}
                >
                  {item.name}
                </div>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <LanguageSwitcher />
              <ThemeToggle />
            </motion.div>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center md:hidden space-x-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-sm"
          >
            <div className="container-width px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.name as string}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  >
                    <div
                      className={`block py-2 text-base font-medium transition-colors hover:text-primary text-muted-foreground cursor-pointer`}
                      onClick={() => {
                        setIsOpen(false)
                        item.onClick()
                      }}
                    >
                      {item.name}
                    </div>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
