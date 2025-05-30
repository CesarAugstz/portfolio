'use client'
import type React from 'react'
import { useMemo, useRef, useState } from 'react'
import { motion, useInView, Variants } from 'framer-motion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { useTranslations } from '@/hooks/useTranslations'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [submitState, setSubmitState] = useState<
    'submitting' | 'success' | 'error' | null
  >(null)
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      setSubmitState('submitting')
      const key = process.env.NEXT_PUBLIC_FORM_APIKEY
      const formData = new FormData(e.target as HTMLFormElement)
      formData.append('access_key', key!)

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      if (!data.success) throw new Error(data.message)
      setSubmitState('success')
      setTimeout(() => {
        setSubmitState(null)
      }, 3000)
      ;(e.target as HTMLFormElement).reset()
    } catch {
      setSubmitState('error')
      setTimeout(() => {
        setSubmitState(null)
      }, 3000)
    }
  }

  const FormInfo = useMemo(() => {
    if (!submitState) return null

    const variants: Variants = {
      initial: { opacity: 0, y: 30, scale: 0.95 },
      animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: 'spring',
          stiffness: 800,
          damping: 70,
        },
      },
      exit: {
        opacity: 0,
        y: -30,
        scale: 0.95,
        transition: { duration: 0.5 },
      },
    }

    switch (submitState) {
      case 'submitting':
        return null
      case 'success':
        return (
          <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="mt-4"
          >
            <Alert className="border-green-200 bg-green-50 dark:bg-green-950/50 dark:border-green-800">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 dark:text-green-200 font-medium">
                {t('contact.form.success')}
              </AlertDescription>
            </Alert>
          </motion.div>
        )
      case 'error':
        return (
          <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="mt-4"
          >
            <Alert className="border-red-200 bg-red-50 dark:bg-red-950/50 dark:border-red-800">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 dark:text-red-200 font-medium">
                {t('contact.form.error')}
              </AlertDescription>
            </Alert>
          </motion.div>
        )
      default:
        return null
    }
  }, [submitState, t])

  return (
    <section id="contact" className="section-padding my-4 py-4">
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
              {t('contact.title')}
            </h2>
            <p className="text-muted-foreground">{t('contact.subtitle')}</p>
          </motion.div>
          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t('contact.form.title')}</CardTitle>
                  <CardDescription>
                    {t('contact.form.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t('contact.form.name')}</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder={t('contact.form.namePlaceholder')}
                          required
                          disabled={submitState === 'submitting'}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t('contact.form.email')}</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder={t('contact.form.emailPlaceholder')}
                          disabled={submitState === 'submitting'}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">
                        {t('contact.form.subject')}
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder={t('contact.form.subjectPlaceholder')}
                        disabled={submitState === 'submitting'}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">
                        {t('contact.form.message')}
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder={t('contact.form.messagePlaceholder')}
                        rows={5}
                        disabled={submitState === 'submitting'}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full relative overflow-hidden group"
                      disabled={submitState === 'submitting'}
                    >
                      {submitState === 'submitting' ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t('contact.form.sending')}
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                          {t('contact.form.sendMessage')}
                        </>
                      )}
                    </Button>
                    {FormInfo}
                  </form>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-6">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{t('contact.info.title')}</CardTitle>
                  <CardDescription>
                    {t('contact.info.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{t('contact.info.email')}</p>
                      <a
                        href="mailto:dev.caugustoaf@gmail.com"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        dev.caugustoaf@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{t('contact.info.phone')}</p>
                      <a
                        href="tel:+5565992560242"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        +55 (65) 9 9256-0242
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {t('contact.info.location')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t('contact.info.locationValue')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
