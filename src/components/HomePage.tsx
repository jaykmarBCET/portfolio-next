'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { CircleLoader } from 'react-spinners'
import { usePublicProfileStore } from '@/store/public.store'
import ProjectCard from '@/components/ProjectCard'
import SkillsCard from '@/components/SkillsCard'
import ExperienceCard from '@/components/ExpreriencesCard'

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
      <div className="min-h-screen flex items-center justify-center bg-[#070b16] text-[#dae2fd]">
        <div className="flex flex-col items-center gap-5">
          <CircleLoader color="#98cbff" size={80} />
          <p className="text-sm text-[#bec7d4]">Loading portfolio data...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#060b15] via-[#070c17] to-[#0b111f] text-[#dae2fd]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(60,180,255,0.18),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(55,237,255,0.12),_transparent_30%)]" />
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-[#98cbff] shadow-sm shadow-[#2fd9f4]/10 backdrop-blur">
                <span className="h-2.5 w-2.5 rounded-full bg-[#2fd9f4] animate-pulse" />
                Featured portfolio with live project previews
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-[#98cbff]/80">Hi, I&apos;m</p>
                  <h1 className="mt-3 text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                    {user?.name || 'Jay Kumar'}
                  </h1>
                </div>

                <p className="max-w-2xl text-base leading-8 text-[#bfc9df] sm:text-lg">
                  {user?.bio || 'Full Stack Developer specializing in web and mobile applications with clean interfaces, strong performance, and polished user experiences.'}
                </p>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  <div className="rounded-3xl border border-[#2b3a58] bg-[#111827]/70 p-6 shadow-xl shadow-[#0c182d]/40">
                    <p className="text-sm text-[#98cbff] uppercase tracking-[0.24em]">Projects</p>
                    <p className="mt-4 text-4xl font-black text-white">{projects.length}</p>
                    <p className="mt-2 text-sm text-[#b0bdd7]">Live builds, case studies, and UI explorations.</p>
                  </div>
                  <div className="rounded-3xl border border-[#2b3a58] bg-[#111827]/70 p-6 shadow-xl shadow-[#0c182d]/40">
                    <p className="text-sm text-[#98cbff] uppercase tracking-[0.24em]">Skills</p>
                    <p className="mt-4 text-4xl font-black text-white">{skills.length}</p>
                    <p className="mt-2 text-sm text-[#b0bdd7]">Modern stack knowledge across frontend, backend, and tooling.</p>
                  </div>
                  <div className="rounded-3xl border border-[#2b3a58] bg-[#111827]/70 p-6 shadow-xl shadow-[#0c182d]/40">
                    <p className="text-sm text-[#98cbff] uppercase tracking-[0.24em]">Languages</p>
                    <p className="mt-4 text-4xl font-black text-white">{languages.length}</p>
                    <p className="mt-2 text-sm text-[#b0bdd7]">Human languages spoken and used for communication.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="relative overflow-hidden rounded-[2rem] border border-[#ffffff0f] bg-[#0e1729]/80 p-6 shadow-2xl shadow-[#0f1830]/70 backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2fd9f4]/40 via-transparent to-[#0b111f]/80 pointer-events-none" />
                <div className="relative flex items-center gap-5">
                  <div className="relative h-36 w-36 rounded-full border-4 border-[#0b111f] bg-[#10182f] overflow-hidden shadow-2xl shadow-[#1a2f4d]/70">
                    <Image
                      src={user?.avatarUrl || 'https://via.placeholder.com/280'}
                      alt={user?.name || 'Profile Image'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-[#98cbff] uppercase tracking-[0.24em]">Profile</p>
                    <h2 className="mt-3 text-3xl font-bold text-white">{user?.name || 'Jay Kumar'}</h2>
                    <p className="mt-2 text-sm text-[#bcc8dc]">{user?.email || 'Full stack developer based in India'}</p>
                  </div>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {socialMedia?.slice(0, 4).map((item, index) => (
                    <a
                      key={index}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-3xl border border-[#2b3a58] bg-[#06101f]/80 p-4 transition hover:border-[#98cbff]/40 hover:bg-[#0f1f35]"
                    >
                      <p className="text-sm text-[#98cbff] font-semibold">{item.platform}</p>
                      {item.username && <p className="mt-1 text-sm text-[#c3d0e8]">{item.username}</p>}
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#ffffff0f] bg-[#111827]/80 p-6 shadow-2xl shadow-[#0f1830]/50">
                <h3 className="text-sm uppercase tracking-[0.24em] text-[#98cbff]">Quick Links</h3>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <a href="#projects" className="rounded-3xl bg-[#14213d] px-5 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#1e2f56]">View Projects</a>
                  <a href="#contact" className="rounded-3xl bg-[#0f1724] border border-[#98cbff]/10 px-5 py-4 text-center text-sm text-[#b7c4dc] transition hover:bg-[#121c31]">Get In Touch</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-[#98cbff]/80">Skills & Experience</p>
            <h2 className="mt-4 text-4xl font-black text-white sm:text-5xl">What I build and where I&apos;ve done it.</h2>
            <p className="mt-4 max-w-2xl mx-auto text-base leading-8 text-[#bfc9df]">
              A curated view of my technical strengths and the practical experience that backs them.
            </p>
          </div>

          <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-[#ffffff14] bg-[#0f1724]/80 p-6 shadow-2xl shadow-[#0b111a]/60">
              <h3 className="text-2xl font-semibold text-white mb-6">Core skills</h3>
              <SkillsCard />
            </div>

            <div className="rounded-[2rem] border border-[#ffffff14] bg-[#0f1724]/80 p-6 shadow-2xl shadow-[#0b111a]/60">
              <h3 className="text-2xl font-semibold text-white mb-6">Professional experience</h3>
              <ExperienceCard />
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-[#98cbff]/80">Selected work</p>
            <h2 className="mt-4 text-4xl font-black text-white sm:text-5xl">Projects that showcase quality and polish.</h2>
            <p className="mt-4 max-w-2xl mx-auto text-base leading-8 text-[#bfc9df]">
              Explore a curated selection of my latest work with live links, code samples, and modern UI previews.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-[#ffffff14] bg-[#0f1724]/80 p-6 shadow-2xl shadow-[#0b111a]/60">
            <ProjectCard />
          </div>
        </div>
      </section>

      <section id="contact" className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="rounded-[2rem] border border-[#ffffff14] bg-[#111827]/80 p-10 shadow-2xl shadow-[#0b111a]/60">
            <h2 className="text-3xl font-black text-white">Ready to build something great?</h2>
            <p className="mt-4 text-base leading-7 text-[#bfc9df]">If you have a project idea or want to collaborate, I&apos;m available for freelance work, startups, and product partnerships.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="mailto:hello@jaykumar.dev" className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-[#98cbff] to-[#2fd9f4] px-6 py-3 text-sm font-semibold text-[#0b111f] transition hover:shadow-lg hover:shadow-[#98cbff]/30">Email Me</a>
              <a href="/public/contact" className="inline-flex items-center justify-center rounded-3xl border border-[#98cbff]/20 bg-[#0b111f]/80 px-6 py-3 text-sm font-semibold text-[#98cbff] transition hover:bg-[#14243e]">Contact page</a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#ffffff14] bg-[#0d1624]/80 p-10 shadow-2xl shadow-[#0b111a]/50">
            <p className="text-sm uppercase tracking-[0.3em] text-[#98cbff]/80">What I bring</p>
            <div className="mt-8 space-y-5">
              <div className="rounded-3xl border border-[#2d3b5c] bg-[#121d33]/80 p-5">
                <h3 className="font-semibold text-white">Design-first development</h3>
                <p className="mt-2 text-sm text-[#bfc9df]">I build interfaces that look polished, feel responsive, and are easy to navigate.</p>
              </div>
              <div className="rounded-3xl border border-[#2d3b5c] bg-[#121d33]/80 p-5">
                <h3 className="font-semibold text-white">Performance & reliability</h3>
                <p className="mt-2 text-sm text-[#bfc9df]">Each project is optimized for smooth loading and consistent behavior across devices.</p>
              </div>
              <div className="rounded-3xl border border-[#2d3b5c] bg-[#121d33]/80 p-5">
                <h3 className="font-semibold text-white">Collaborative process</h3>
                <p className="mt-2 text-sm text-[#bfc9df]">I keep communication clear and deliver with quality, on time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
