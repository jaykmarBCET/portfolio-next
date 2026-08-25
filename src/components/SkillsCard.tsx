'use client'

import React, { useMemo, useState } from 'react'
import { usePublicProfileStore } from '@/store/public.store'
import { DevIcons } from '@/constants/SkiilsIcons'

type FilterCategory = 'all' | 'android' | 'web' | 'backend'

const isAndroidSkill = (s: { name: string; isAndroid?: boolean; isISO?: boolean }) => {
  const k = s.name.toLowerCase()
  return !!(
    s.isAndroid ||
    s.isISO ||
    k.includes('android') ||
    k.includes('kotlin') ||
    k.includes('flutter') ||
    k.includes('java') ||
    k.includes('swift') ||
    k.includes('mobile')
  )
}

const isWebSkill = (s: { name: string; isWeb?: boolean }) => {
  const k = s.name.toLowerCase()
  return !!(
    s.isWeb ||
    k.includes('react') ||
    k.includes('next') ||
    k.includes('html') ||
    k.includes('css') ||
    k.includes('tailwind') ||
    k.includes('vue') ||
    k.includes('angular') ||
    k.includes('script') ||
    k.includes('web')
  )
}

const isBackendSkill = (s: { name: string }) => {
  const k = s.name.toLowerCase()
  return !!(
    k.includes('node') ||
    k.includes('express') ||
    k.includes('mongo') ||
    k.includes('postgres') ||
    k.includes('sql') ||
    k.includes('firebase') ||
    k.includes('git') ||
    k.includes('docker') ||
    k.includes('api') ||
    k.includes('python') ||
    k.includes('c')
  )
}

function SkillsCard() {
  const { skills } = usePublicProfileStore()
  const [activeTab, setActiveTab] = useState<FilterCategory>('all')

  const displaySkills = useMemo(() => skills || [], [skills])

  const normalize = (name: string) => {
    if (!name) return ''
    const n = name.toLowerCase().trim()
    if (n === 'c++' || n === 'cplusplus') return 'cpp'
    if (n === 'c#' || n === 'csharp') return 'csharp'
    if (n === 'node.js' || n === 'node') return 'node'
    if (n === 'next.js' || n === 'next') return 'nextjs'
    if (n === 'vue.js' || n === 'vue') return 'vue'
    if (n === 'react.js' || n === 'react') return 'react'
    if (n === 'react native') return 'reactnative'
    if (n === 'android studio') return 'androidstudio'
    return n.replace(/[^a-z0-9]/g, '')
  }

  const getDevIconClass = (skill: { name: string; iconName?: string }) => {
    if (skill.iconName && skill.iconName.trim().length > 0) {
      return skill.iconName.trim()
    }
    const key = normalize(skill.name)
    if (DevIcons[key]) return DevIcons[key]

    // Substring fallback checks
    if (key.includes('android')) return 'devicon-android-plain'
    if (key.includes('kotlin')) return 'devicon-kotlin-plain'
    if (key.includes('java')) return 'devicon-java-plain'
    if (key.includes('flutter')) return 'devicon-flutter-plain'
    if (key.includes('react')) return 'devicon-react-original'
    if (key.includes('next')) return 'devicon-nextjs-original'
    if (key.includes('node')) return 'devicon-express-original'
    if (key.includes('express')) return 'devicon-express-original'
    if (key.includes('mongo')) return 'devicon-mongodb-plain'
    if (key.includes('postgres')) return 'devicon-postgresql-plain'
    if (key.includes('sql')) return 'devicon-sqlite-plain'
    if (key.includes('python')) return 'devicon-python-plain'
    if (key.includes('git')) return 'devicon-git-plain'
    if (key.includes('docker')) return 'devicon-docker-plain'
    if (key.includes('aws')) return 'devicon-amazonwebservices-original'
    if (key.includes('tailwind')) return 'devicon-tailwindcss-plain'
    if (key.includes('html')) return 'devicon-html5-plain'
    if (key.includes('css')) return 'devicon-css3-plain'
    if (key.includes('js') || key.includes('script')) return 'devicon-javascript-plain'

    return 'devicon-code-plain'
  }

  const getProficiencyStyle = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'expert':
      case 'advanced':
        return 'bg-[#2fd9f4]/10 text-[#2fd9f4] border-[#2fd9f4]/30'
      case 'intermediate':
        return 'bg-[#98cbff]/10 text-[#98cbff] border-[#98cbff]/30'
      default:
        return 'bg-slate-500/15 text-slate-300 border-slate-500/30'
    }
  }

  const filteredSkills = useMemo(() => {
    if (activeTab === 'android') return displaySkills.filter(isAndroidSkill)
    if (activeTab === 'web') return displaySkills.filter(isWebSkill)
    if (activeTab === 'backend') return displaySkills.filter(isBackendSkill)
    return displaySkills
  }, [displaySkills, activeTab])

  if (!skills?.length) return null

  const tabs: { id: FilterCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Stack', count: displaySkills.length },
    { id: 'android', label: 'Android & Mobile', count: displaySkills.filter(isAndroidSkill).length },
    { id: 'web', label: 'Web & Frontend', count: displaySkills.filter(isWebSkill).length },
    { id: 'backend', label: 'Backend & Tools', count: displaySkills.filter(isBackendSkill).length },
  ]

  return (
    <section className="space-y-6">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            type="button"
            className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-[#2fd9f4] text-[#070c17] shadow-lg shadow-[#2fd9f4]/25 scale-[1.02]'
                : 'bg-[#111827] text-[#bec7d4] border border-white/10 hover:border-white/20 hover:text-white'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                activeTab === tab.id ? 'bg-[#070c17]/20 text-[#070c17]' : 'bg-white/10 text-[#98cbff]'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 auto-rows-fr">
        {filteredSkills.map((skill) => {
          const iconClass = getDevIconClass(skill)
          return (
            <div
              key={skill._id}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#111827]/80 p-4 sm:p-5 shadow-lg shadow-[#060b15]/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#2fd9f4]/40 hover:shadow-[0_12px_30px_-10px_rgba(47,217,244,0.2)]"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0b1220] border border-white/10 text-2xl text-[#2fd9f4] transition-transform group-hover:scale-110">
                    <i className={`${iconClass} colored`} aria-hidden="true" />
                  </div>
                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded-full border font-semibold tracking-wider uppercase shrink-0 ${getProficiencyStyle(
                      skill.level
                    )}`}
                  >
                    {skill.level}
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-bold text-[#dae2fd] group-hover:text-[#2fd9f4] transition-colors line-clamp-1">
                  {skill.name}
                </h4>
              </div>

              {/* Platform Badges */}
              <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap gap-1.5 items-center">
                {skill.isAndroid && (
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#2fd9f4]/10 text-[#2fd9f4] border border-[#2fd9f4]/20 font-medium flex items-center gap-1">
                    <span>🤖</span> Android
                  </span>
                )}
                {skill.isWeb && (
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#98cbff]/10 text-[#98cbff] border border-[#98cbff]/20 font-medium flex items-center gap-1">
                    <span>🌐</span> Web
                  </span>
                )}
                {skill.isISO && (
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-400/10 text-purple-300 border border-purple-400/20 font-medium flex items-center gap-1">
                    <span>🍎</span> iOS
                  </span>
                )}
                {!skill.isAndroid && !skill.isWeb && !skill.isISO && (
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-[#a0acc0] border border-white/5 font-medium">
                    General Stack
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default SkillsCard
