import type { Metadata } from "next"
import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Projects from "@/components/sections/projects"
import Skills from "@/components/sections/skills"
import Contact from "@/components/sections/contact"

export const metadata: Metadata = {
  title: "Portfolio | Home",
  description: "Welcome to my portfolio website showcasing my work and skills",
}

export default function Home() {

  return (
    <div className="container mx-auto px-2">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </div>
  )
}

