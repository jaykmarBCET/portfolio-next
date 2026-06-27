'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { usePublicProfileStore } from '@/store/public.store'
import { DevIcons } from '@/constants/SkiilsIcons'

function SkillsCard() {
  const { skills } = usePublicProfileStore()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(true)

  const displaySkills = useMemo(() => skills || [], [skills])

  useEffect(() => {
    if (!isAutoScroll || !scrollerRef.current) return

    const element = scrollerRef.current
    const interval = window.setInterval(() => {
      if (!element) return
      if (element.scrollLeft + element.clientWidth >= element.scrollWidth - 10) {
        element.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        element.scrollBy({ left: 1, behavior: 'smooth' })
      }
    }, 40)

    return () => window.clearInterval(interval)
  }, [isAutoScroll])

  if (!skills?.length) return null

  const normalize = (name: string) => {
    if (!name) return ''
    const n = name.toLowerCase().trim()
    // common normalizations
    if (n === 'c++') return 'cpp'
    if (n === 'c#' || n === 'csharp') return 'csharp'
    if (n === 'node.js' || n === 'node') return 'nodejs'
    // remove non-alphanumeric
    return n.replace(/[^a-z0-9]/g, '')
  }

  const getDevIconClass = (skillName: string) => {
    const key = normalize(skillName)
    // lookup in the DevIcons mapping (keys are lowercase)
    const cls = (DevIcons as Record<string, string>)[key]
    return cls || 'devicon-plain'
  }

  const getProficiencyStyle = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'expert':
      case 'advanced':
        return 'bg-[#2fd9f4]/10 text-[#2fd9f4] border-[#2fd9f4]/20'
      case 'intermediate':
        return 'bg-[#98cbff]/10 text-[#98cbff] border-[#98cbff]/20'
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20'
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollerRef.current) return
    scrollerRef.current.scrollBy({
      left: direction === 'left' ? -280 : 280,
      behavior: 'smooth'
    })
  }


  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="h-1 w-8 bg-[#2fd9f4] rounded-full" />
          <h3 className="text-[#dae2fd] font-bold tracking-tight uppercase text-sm">Core Stack</h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="rounded-full border border-[#2fd9f4]/15 bg-[#0b111f]/80 px-3 py-2 text-[#98cbff] transition hover:border-[#2fd9f4]/40"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          <button
            type="button"
            onClick={() => scroll('right')}
            className="rounded-full border border-[#2fd9f4]/15 bg-[#0b111f]/80 px-3 py-2 text-[#98cbff] transition hover:border-[#2fd9f4]/40"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAutoScroll((prev) => !prev)}
            className="rounded-full border border-[#98cbff]/15 bg-[#0b111f]/80 px-3 py-2 text-[#98cbff] transition hover:border-[#98cbff]/40"
          >
            {isAutoScroll ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        onMouseEnter={() => setIsAutoScroll(false)}
        onMouseLeave={() => setIsAutoScroll(true)}
        className="overflow-x-auto scrollbar-hide py-4 px-2 md:px-4"
      >
        <div className="grid grid-flow-col auto-cols-[minmax(220px,220px)] grid-rows-2 gap-4">
          {displaySkills.map((skill) => (
            <div
              key={skill._id}
              className="w-full rounded-[1.75rem] border border-white/10 bg-[#111827]/80 p-5 shadow-[0_20px_60px_-40px_rgba(45,58,93,0.9)] transition-transform duration-300 hover:-translate-y-1"
            >
            <div className="flex items-center justify-between mb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#0f1724] border border-white/10 text-2xl text-[#2fd9f4]">
                <i className={`${getDevIconClass(skill.name)} colored`} aria-hidden="true" />
              </div>
              <span className={`text-[10px] px-2 py-1 rounded-full border font-semibold uppercase tracking-[0.3em] ${getProficiencyStyle(skill.level)}`}>
                {skill.level}
              </span>
            </div>

            <h4 className="text-lg font-semibold text-[#dae2fd] mb-2">{skill.name}</h4>
          </div>
          ))}
        </div>
      </div>

      <div className="relative mt-3 h-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0b111f] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0b111f] to-transparent" />
      </div>
    </section>
  )
}

export default SkillsCard
