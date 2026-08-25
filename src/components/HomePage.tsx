'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { CircleLoader } from 'react-spinners'
import { usePublicProfileStore } from '@/store/public.store'
import ProjectCard from '@/components/ProjectCard'
import SkillsCard from '@/components/SkillsCard'
import ExperienceCard from '@/components/ExpreriencesCard'
import Navbar from '@/components/Navbar'

export default function HomePage() {
  const { user, projects, skills, languages, socialMedia, getFullProfile } = usePublicProfileStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadProfile() {
      try {
        await getFullProfile()
      } catch (error) {
        console.error('Failed to load profile:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [getFullProfile])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#060b15] text-[#dae2fd]">
        <div className="flex flex-col items-center gap-5">
          <CircleLoader color="#2fd9f4" size={70} />
          <p className="text-xs sm:text-sm text-[#bec7d4] font-medium tracking-wide">Loading digital profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#060b15] via-[#070c17] to-[#0b111f] text-[#dae2fd] overflow-x-hidden">
      {/* Sticky Glassmorphism Header */}
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(47,217,244,0.15),_transparent_50%),radial-gradient(circle_at_bottom_right,_rgba(152,203,255,0.1),_transparent_35%)] pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 py-10 sm:py-16 lg:py-24 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
              {/* Left Column Text */}
              <div className="space-y-6 sm:space-y-8">
                <div className="inline-flex items-center gap-2.5 rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5 text-xs sm:text-sm text-[#98cbff] shadow-sm shadow-[#2fd9f4]/10 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-[#2fd9f4] animate-pulse" />
                  Full Stack & Android App Developer
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#98cbff]/80 font-bold">
                      Hi, I&apos;m
                    </p>
                    <h1 className="mt-2 text-4xl xs:text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                      {user?.name || 'Jay Kumar'}
                    </h1>
                  </div>

                  <p className="max-w-2xl text-sm sm:text-base leading-7 sm:leading-8 text-[#bfc9df]">
                    {user?.bio ||
                      'Full Stack Developer specializing in web and mobile applications with clean interfaces, strong performance, and polished user experiences.'}
                  </p>

                  <div className="grid gap-3 grid-cols-1 xs:grid-cols-3 pt-2">
                    <div className="rounded-2xl sm:rounded-3xl border border-[#2b3a58] bg-[#111827]/70 p-4 sm:p-5 shadow-xl shadow-[#0c182d]/40 backdrop-blur-md">
                      <p className="text-[11px] text-[#98cbff] uppercase tracking-[0.2em] font-bold">Projects</p>
                      <p className="mt-2 text-2xl sm:text-4xl font-black text-white">{projects.length}</p>
                      <p className="mt-1 text-xs text-[#b0bdd7]">Live builds & case studies</p>
                    </div>
                    <div className="rounded-2xl sm:rounded-3xl border border-[#2b3a58] bg-[#111827]/70 p-4 sm:p-5 shadow-xl shadow-[#0c182d]/40 backdrop-blur-md">
                      <p className="text-[11px] text-[#98cbff] uppercase tracking-[0.2em] font-bold">Skills</p>
                      <p className="mt-2 text-2xl sm:text-4xl font-black text-white">{skills.length}</p>
                      <p className="mt-1 text-xs text-[#b0bdd7]">Web & Android tools</p>
                    </div>
                    <div className="rounded-2xl sm:rounded-3xl border border-[#2b3a58] bg-[#111827]/70 p-4 sm:p-5 shadow-xl shadow-[#0c182d]/40 backdrop-blur-md">
                      <p className="text-[11px] text-[#98cbff] uppercase tracking-[0.2em] font-bold">Languages</p>
                      <p className="mt-2 text-2xl sm:text-4xl font-black text-white">{languages.length}</p>
                      <p className="mt-1 text-xs text-[#b0bdd7]">Spoken languages</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column Profile Card */}
              <div className="grid gap-4 sm:gap-6">
                <div className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 bg-[#0e1729]/80 p-5 sm:p-6 shadow-2xl shadow-[#0f1830]/70 backdrop-blur-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2fd9f4]/20 via-transparent to-[#0b111f]/80 pointer-events-none" />
                  
                  {/* Profile Info Header */}
                  <div className="relative flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 sm:gap-5">
                    <div className="relative h-28 w-28 sm:h-36 sm:w-36 shrink-0 rounded-full border-4 border-[#0b111f] bg-[#10182f] overflow-hidden shadow-2xl shadow-[#1a2f4d]/70">
                      <Image
                        src={user?.avatarUrl || 'https://via.placeholder.com/280'}
                        alt={user?.name || 'Profile Image'}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-[#98cbff] uppercase tracking-[0.2em] font-bold">Digital Architect</p>
                      <h2 className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold text-white">{user?.name || 'Jay Kumar'}</h2>
                      <p className="mt-1 text-xs sm:text-sm text-[#bcc8dc]">{user?.email || 'Full Stack & Mobile Engineer'}</p>
                    </div>
                  </div>

                  {/* Social Media Links */}
                  <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-3">
                    {socialMedia?.slice(0, 4).map((item, index) => (
                      <a
                        key={index}
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl border border-[#2b3a58] bg-[#06101f]/80 p-3 transition-all hover:border-[#2fd9f4]/40 hover:bg-[#0f1f35] flex items-center justify-between"
                      >
                        <div>
                          <p className="text-xs text-[#98cbff] font-semibold">{item.platform}</p>
                          {item.username && <p className="mt-0.5 text-[11px] text-[#c3d0e8] truncate max-w-[100px]">{item.username}</p>}
                        </div>
                        <span className="material-symbols-outlined text-sm text-[#2fd9f4]">open_in_new</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Quick Action Box */}
                <div className="rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 bg-[#111827]/80 p-5 sm:p-6 shadow-xl">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-[#98cbff] font-bold">Quick Navigation</h3>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <a
                      href="#projects"
                      className="rounded-xl sm:rounded-2xl bg-[#14213d] px-4 py-3 text-center text-xs sm:text-sm font-semibold text-white transition hover:bg-[#1e2f56]"
                    >
                      View Projects
                    </a>
                    <a
                      href="#contact"
                      className="rounded-xl sm:rounded-2xl bg-[#0f1724] border border-[#98cbff]/20 px-4 py-3 text-center text-xs sm:text-sm font-semibold text-[#b7c4dc] transition hover:bg-[#121c31]"
                    >
                      Get In Touch
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills & Experience Section */}
        <section id="skills" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 sm:mb-12 text-center">
              <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#98cbff]/80 font-bold">
                Tech Stack & Background
              </p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-black text-white lg:text-5xl">
                Skills, Platforms & Experience
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-xs sm:text-base leading-6 sm:leading-8 text-[#bfc9df]">
                An interactive overview of my core technical strengths across Mobile, Web, and Backend ecosystems.
              </p>
            </div>

            <div className="grid gap-6 lg:gap-8 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 bg-[#0f1724]/80 p-4 sm:p-7 shadow-2xl shadow-[#0b111a]/60">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-5">Technical Expertise</h3>
                <SkillsCard />
              </div>

              <div className="rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 bg-[#0f1724]/80 p-4 sm:p-7 shadow-2xl shadow-[#0b111a]/60">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-5">Professional Experience</h3>
                <ExperienceCard />
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 sm:mb-12 text-center">
              <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#98cbff]/80 font-bold">
                Featured Work
              </p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-black text-white lg:text-5xl">
                Selected Projects & Builds
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-xs sm:text-base leading-6 sm:leading-8 text-[#bfc9df]">
                Explore live web and mobile builds, case studies, and UI designs.
              </p>
            </div>

            <div className="overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 bg-[#0f1724]/80 p-3 sm:p-6 shadow-2xl shadow-[#0b111a]/60">
              <ProjectCard />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid gap-6 sm:gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div className="rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 bg-[#111827]/80 p-6 sm:p-10 shadow-2xl shadow-[#0b111a]/60">
              <h2 className="text-2xl sm:text-3xl font-black text-white">Ready to build something great?</h2>
              <p className="mt-3 text-xs sm:text-base leading-6 sm:leading-7 text-[#bfc9df]">
                If you have a project idea, mobile app requirement, or want to collaborate, I&apos;m available for freelance work, startups, and engineering roles.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:hello@jaykumar.dev"
                  className="inline-flex items-center justify-center rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#98cbff] to-[#2fd9f4] px-6 py-3.5 text-xs sm:text-sm font-bold text-[#0b111f] transition hover:shadow-lg hover:shadow-[#2fd9f4]/30"
                >
                  Email Me Direct
                </a>
                <a
                  href="/public/contact"
                  className="inline-flex items-center justify-center rounded-2xl sm:rounded-3xl border border-[#98cbff]/20 bg-[#0b111f]/80 px-6 py-3.5 text-xs sm:text-sm font-bold text-[#98cbff] transition hover:bg-[#14243e]"
                >
                  Contact Form Page
                </a>
              </div>
            </div>

            <div className="rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 bg-[#0d1624]/80 p-6 sm:p-10 shadow-2xl shadow-[#0b111a]/50">
              <p className="text-xs uppercase tracking-[0.2em] text-[#98cbff]/80 font-bold">What I Bring</p>
              <div className="mt-6 space-y-4 sm:space-y-5">
                <div className="rounded-2xl border border-[#2d3b5c] bg-[#121d33]/80 p-4 sm:p-5">
                  <h3 className="font-bold text-white text-sm sm:text-base">Design & Mobile-First Development</h3>
                  <p className="mt-1 text-xs sm:text-sm text-[#bfc9df]">
                    I craft responsive web and Android mobile applications built for high performance and smooth interaction.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#2d3b5c] bg-[#121d33]/80 p-4 sm:p-5">
                  <h3 className="font-bold text-white text-sm sm:text-base">Performance & Clean Architecture</h3>
                  <p className="mt-1 text-xs sm:text-sm text-[#bfc9df]">
                    Scalable code, fast loading speeds, and robust API integrations across desktop and mobile browsers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#040810] py-8 text-center text-xs text-[#88919d]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Jay Kumar. Built with Next.js & Tailwind CSS.</p>
          <a href="/private/login" className="text-[#98cbff] hover:underline">
            Admin Workbench
          </a>
        </div>
      </footer>
    </div>
  )
}
