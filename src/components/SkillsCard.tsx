'use client'

import React, { useMemo } from 'react'
import { usePublicProfileStore } from '@/store/public.store'
import { DevIcons } from '@/constants/SkiilsIcons'

function SkillsCard() {
  const { skills } = usePublicProfileStore()
  const displaySkills = useMemo(() => skills || [], [skills])

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

  return (
    <section>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <div className="h-1 w-8 bg-[#2fd9f4] rounded-full" />
          <h3 className="text-[#dae2fd] font-bold tracking-tight uppercase text-sm">Core Stack</h3>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 auto-rows-min">
        {displaySkills.map((skill) => (
          <div
            key={skill._id}
            className="w-full min-w-0 rounded-[1.75rem] border border-white/10 bg-[#111827]/80 p-5 shadow-[0_20px_60px_-40px_rgba(45,58,93,0.9)] transition-transform duration-300 hover:-translate-y-1 min-h-[140px] overflow-hidden"
          >
            <div className="flex items-center justify-between mb-5 gap-4">
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
    </section>
  )
}

export default SkillsCard
