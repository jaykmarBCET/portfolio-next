'use client'
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { usePublicProfileStore } from '@/store/public.store'
import { Resume } from '@/types/types'
import ContactCard from '@/components/ContactCard'
import { CircleLoader, ClimbingBoxLoader } from 'react-spinners'

interface Skill {
  name: string
  proficiency?: number
  iconName?: string
  level?: string
}

interface Certification {
  title: string
  issuer: string
  credentialUrl?: string
}

type TabType = 'home' | 'projects' | 'skills' | 'certifications' | 'resumes' | 'contact'
type PlatformType = 'isWeb' | 'isAndroid' | 'isIOS' | 'isMac' | 'isServer' | 'isWindows'

interface PlatformFilter {
  isWeb: boolean
  isAndroid: boolean
  isIOS: boolean
  isMac: boolean
  isServer: boolean
  isWindows: boolean
}

// Type for items that have platform filtering capabilities
type PlatformFilterableItem = Partial<Record<PlatformType, boolean>>

function PublicPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<TabType>('home')
  const [projectIndex, setProjectIndex] = useState(0)
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformFilter>({
    isWeb: true,
    isAndroid: false,
    isIOS: false,
    isMac: false,
    isServer: false,
    isWindows: false,
  })

  const getSocialMediaHost = (url: string) => {
    try {
      const normalizedUrl = url.startsWith('http') ? url : `https://${url}`
      return new URL(normalizedUrl).hostname.replace(/^www\./, '')
    } catch {
      return url
    }
  }

  const getSocialMediaFavicon = (url: string) => {
    const host = getSocialMediaHost(url)
    return `https://www.google.com/s2/favicons?sz=64&domain=${host}`
  }

  const {
    getFullProfile,
    skills,
    projects,
    experiences,
    certifications,
    resumes,
    socialMedia,
    languages,
    interests,
    user
  } = usePublicProfileStore()

  const loadAllData = useCallback(async () => {
    try {
      setIsLoading(true)
      await getFullProfile()
    } catch (error) {
      console.error('Failed to load profile:', error)
    } finally {
      setIsLoading(false)
    }
  }, [getFullProfile])

  // Filter helper function
  const filterByPlatform = <T extends Partial<Record<PlatformType, boolean>>>(items: T[]) => {
    if (!items) return [] as T[]
    return items.filter((item) => {
      const hasSelectedPlatform = (Object.entries(selectedPlatforms) as [PlatformType, boolean][]).some(
        ([key, value]) => value && item[key]
      )
      return hasSelectedPlatform
    }) as T[]
  }

  // Filtered data
  const filteredResumes = filterByPlatform(resumes)
  const filteredSkills = filterByPlatform(skills)
  const filteredProjects = filterByPlatform(projects)

  // Reset project index when filtered projects change
  useEffect(() => {
    if (projectIndex >= filteredProjects.length && filteredProjects.length > 0) {
      setProjectIndex(0)
    }
  }, [filteredProjects.length, projectIndex])

  // Platform toggle handler
  const togglePlatform = (platform: PlatformType) => {
    setSelectedPlatforms((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }))
  }

  // Get active platform count
  const activePlatformCount = Object.values(selectedPlatforms).filter(Boolean).length

  useEffect(() => {
    loadAllData()
  }, [loadAllData])

  if (isLoading) {
    return (
      <div className='w-screen h-screen flex flex-col justify-center items-center bg-[#0b1326]'>
        <CircleLoader color='#98cbff' size={100} />
        <ClimbingBoxLoader size={20} color='#98cbff' />
        <p className='text-sm italic mt-5 text-[#dae2fd]'>Loading your portfolio...</p>
      </div>
    )
  }

  // Project Carousel Logic
  const currentProject = filteredProjects[projectIndex]
  const nextProject = () => setProjectIndex((prev) => (prev + 1) % Math.max(filteredProjects.length, 1))
  const prevProject = () => setProjectIndex((prev) => (prev - 1 + Math.max(filteredProjects.length, 1)) % Math.max(filteredProjects.length, 1))

  return (
    <div className='min-h-screen bg-gradient-to-b from-[#0b1326] to-[#0a0f1a] text-[#dae2fd] font-["Inter"]'>
      {/* TopAppBar */}
      <header className="bg-[#0b1326]/80 backdrop-blur-xl fixed top-0 w-full z-50 border-b border-[#98cbff]/10">
        <div className="flex items-center justify-between px-4 md:px-6 py-4">
          <span className="text-xl md:text-2xl font-black tracking-tighter bg-gradient-to-r from-[#98cbff] to-[#2fd9f4] bg-clip-text text-transparent">
            Jay
          </span>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-[#dae2fd] hover:text-[#2fd9f4] transition-all cursor-pointer">search</span>
            <span className="material-symbols-outlined text-[#dae2fd] hover:text-[#2fd9f4] transition-all cursor-pointer">menu</span>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-32">
        {/* HOME TAB */}
        {activeTab === 'home' && (
          <section className="px-4 md:px-8 py-12">
            {/* Hero Section - Improved */}
            <div className="max-w-4xl mx-auto mb-16">
              {/* Profile Image with Glow */}
              <div className="flex justify-center mb-12">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#98cbff] via-[#2fd9f4] to-[#98cbff] rounded-full blur-2xl opacity-40 animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#98cbff] to-[#2fd9f4] rounded-full blur-lg opacity-20"></div>
                  <Image
                    src={user?.avatarUrl || "https://via.placeholder.com/160"}
                    alt="Profile"
                    width={160}
                    height={160}
                    className="relative w-40 h-40 rounded-full object-cover border-4 border-[#0b1326] shadow-2xl"
                  />
                </div>
              </div>

              {/* Hero Text */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-[#dae2fd] via-[#98cbff] to-[#2fd9f4] bg-clip-text text-transparent leading-tight">
                  {user?.name || 'Jay Kumar'}
                </h1>
                <p className="text-lg md:text-xl text-[#bec7d4] mb-6 leading-relaxed max-w-2xl mx-auto">
                  {user?.bio || 'Full-stack architect crafting digital experiences with cutting-edge technologies and deep space aesthetics.'}
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {(user?.stackName && user.stackName.length > 0 ? user.stackName : ['Full Stack Developer', 'Problem Solver', 'Tech Enthusiast']).map((label, i) => (
                    <div key={i} className="flex items-center gap-2 px-4 py-2 bg-[#222a3d] rounded-full border border-[#98cbff]/20">
                      <span className="material-symbols-outlined text-xs text-[#2fd9f4]">code</span>
                      <span className="text-sm text-[#dae2fd]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {socialMedia && socialMedia.length > 0 ? (
                  socialMedia.map((item, i) => (
                    <a
                      key={i}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-4 py-3 rounded-full border border-[#98cbff]/20 bg-[#111827] text-sm font-medium text-[#dae2fd] hover:bg-[#98cbff]/10 transition-all"
                    >
                      <img
                        src={getSocialMediaFavicon(item.url)}
                        alt={`${item.platform} icon`}
                        width={20}
                        height={20}
                        className="rounded-full bg-[#0b1326]"
                      />
                      <div className="flex flex-col items-start leading-tight">
                        <span className="font-semibold text-[#98cbff]">{item.platform}</span>
                        {item.username && <span className="text-[#bec7d4] text-xs">{item.username}</span>}
                      </div>
                    </a>
                  ))
                ) : (
                  <p className="text-center text-[#bec7d4]">No social media links available yet.</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                <div className="bg-[#222a3d] border border-[#98cbff]/20 rounded-3xl p-6">
                  <h3 className="text-xl font-semibold text-[#dae2fd] mb-4">Languages</h3>
                  {languages && languages.length > 0 ? (
                    <div className="space-y-3">
                      {languages.map((lang, i) => (
                        <div key={i} className="rounded-2xl bg-[#111827] p-4">
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-semibold text-[#98cbff]">{lang.name}</span>
                            <span className="text-sm text-[#bec7d4]">{lang.fluency}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[#bec7d4]">No languages available yet.</p>
                  )}
                </div>

                <div className="bg-[#222a3d] border border-[#98cbff]/20 rounded-3xl p-6">
                  <h3 className="text-xl font-semibold text-[#dae2fd] mb-4">Interests</h3>
                  {interests && interests.length > 0 ? (
                    <div className="space-y-3">
                      {interests.map((item, i) => (
                        <div key={i} className="rounded-2xl bg-[#111827] p-4">
                          <div className="text-base font-semibold text-[#98cbff]">{item.name}</div>
                          {item.description && <p className="text-sm text-[#bec7d4] mt-2">{item.description}</p>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[#bec7d4]">No interests available yet.</p>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-12">
                {[
                  { number: projects.length, label: 'Projects' },
                  { number: skills.length, label: 'Skills' }
                ].map((stat, i) => (
                  <div key={i} className="bg-[#222a3d] border border-[#98cbff]/20 rounded-xl p-4 text-center hover:border-[#98cbff]/50 transition-all">
                    <div className="text-2xl md:text-3xl font-black text-[#2fd9f4] mb-1">{stat.number}</div>
                    <div className="text-xs md:text-sm text-[#bec7d4]">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setActiveTab('projects')}
                  className="px-8 py-3 bg-gradient-to-r from-[#98cbff] to-[#2fd9f4] text-[#0b1326] font-bold rounded-xl hover:shadow-lg hover:shadow-[#98cbff]/50 transition-all active:scale-95"
                >
                  View Projects →
                </button>
                <button 
                  onClick={() => setActiveTab('contact')}
                  className="px-8 py-3 border-2 border-[#98cbff] text-[#98cbff] font-bold rounded-xl hover:bg-[#98cbff]/10 transition-all active:scale-95"
                >
                  Get in Touch
                </button>
              </div>
            </div>
          </section>
        )}

        {/* PROJECTS TAB - CAROUSEL */}
        {activeTab === 'projects' && projects.length > 0 && (
          <section className="px-4 md:px-8 py-12">
            <h2 className="text-3xl md:text-4xl font-black mb-8 text-center">
              <span className="bg-gradient-to-r from-[#98cbff] to-[#2fd9f4] bg-clip-text text-transparent">Recent Projects</span>
            </h2>
            
            {/* Platform Filter */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
                {(['isWeb', 'isAndroid', 'isIOS', 'isMac', 'isServer', 'isWindows'] as PlatformType[]).map((platform) => {
                  const platformLabels: Record<PlatformType, string> = {
                    isWeb: 'Web',
                    isAndroid: 'Android',
                    isIOS: 'iOS',
                    isMac: 'macOS',
                    isServer: 'Server',
                    isWindows: 'Windows',
                  }
                  return (
                    <button
                      key={platform}
                      onClick={() => togglePlatform(platform)}
                      className={`px-4 py-2 rounded-full font-medium transition-all ${
                        selectedPlatforms[platform]
                          ? 'bg-[#98cbff] text-[#0b1326] shadow-lg shadow-[#98cbff]/30'
                          : 'bg-[#222a3d] text-[#bec7d4] border border-[#3f4852] hover:border-[#98cbff]/50'
                      }`}
                    >
                      {platformLabels[platform]}
                    </button>
                  )
                })}
              </div>
              {activePlatformCount === 0 && (
                <p className="text-center text-[#bec7d4] text-sm mt-4">Select at least one platform to view projects</p>
              )}
            </div>

            {/* Carousel Container */}
            <div className="max-w-4xl mx-auto">
              {filteredProjects.length > 0 && currentProject && (
                <div className="bg-[#222a3d] border border-[#98cbff]/20 rounded-2xl overflow-hidden hover:border-[#98cbff]/50 transition-all">
                  <div className="aspect-video bg-[#1a2236] relative overflow-hidden">
                    {currentProject?.imageUrl && (
                      <Image
                        src={currentProject.imageUrl}
                        alt={currentProject.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326]/80 to-transparent"></div>
                  </div>
                  
                  <div className="p-6 md:p-8">
                    <h3 className="text-2xl md:text-3xl font-black mb-3 text-[#dae2fd]">{currentProject?.title}</h3>
                    <p className="text-[#bec7d4] mb-4 leading-relaxed">{currentProject.description}</p>
                    
                    {currentProject?.technologies && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {currentProject.technologies.map((tech: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-[#98cbff]/10 border border-[#98cbff]/30 text-[#98cbff] text-xs rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3">
                      {currentProject?.liveUrl && (
                        <a href={currentProject.liveUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-[#98cbff] text-[#0b1326] font-bold rounded-lg hover:shadow-lg hover:shadow-[#98cbff]/50 transition-all flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined text-sm">open_in_new</span>
                          Visit Live
                        </a>
                      )}
                      {currentProject?.githubUrl && (
                        <a href={currentProject.githubUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-2 border border-[#98cbff] text-[#98cbff] font-bold rounded-lg hover:bg-[#98cbff]/10 transition-all flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined text-sm">code</span>
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Carousel Controls */}
              {filteredProjects.length > 0 && (
              <div className="flex items-center justify-between mt-8">
                <button 
                  onClick={prevProject}
                  className="p-3 bg-[#222a3d] hover:bg-[#98cbff]/20 text-[#98cbff] rounded-full transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <div className="text-center">
                  <p className="text-[#bec7d4] text-sm">
                    {projectIndex + 1} <span className="text-[#98cbff]">/</span> {filteredProjects.length}
                  </p>
                  <div className="flex gap-1 mt-2 justify-center">
                    {filteredProjects.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setProjectIndex(i)}
                        className={`h-1 rounded-full transition-all ${i === projectIndex ? 'w-8 bg-[#98cbff]' : 'w-2 bg-[#3f4852]'}`}
                      />
                    ))}
                  </div>
                </div>
                <button 
                  onClick={nextProject}
                  className="p-3 bg-[#222a3d] hover:bg-[#98cbff]/20 text-[#98cbff] rounded-full transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
              )}
              {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                  <span className="material-symbols-outlined text-5xl text-[#3f4852] mb-4 block">folder_open</span>
                  <p className="text-[#bec7d4]">No projects available for selected platforms</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* SKILLS TAB - SHOW ALL */}
        {activeTab === 'skills' && skills.length > 0 && (
          <section className="px-4 md:px-8 py-12">
            <h2 className="text-3xl md:text-4xl font-black mb-8 text-center">
              <span className="bg-gradient-to-r from-[#98cbff] to-[#2fd9f4] bg-clip-text text-transparent">Tech Stack</span>
            </h2>
            
            {/* Platform Filter */}
            <div className="max-w-6xl mx-auto mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
                {(['isWeb', 'isAndroid', 'isIOS', 'isMac', 'isServer', 'isWindows'] as PlatformType[]).map((platform) => {
                  const platformLabels: Record<PlatformType, string> = {
                    isWeb: 'Web',
                    isAndroid: 'Android',
                    isIOS: 'iOS',
                    isMac: 'macOS',
                    isServer: 'Server',
                    isWindows: 'Windows',
                  }
                  return (
                    <button
                      key={platform}
                      onClick={() => togglePlatform(platform)}
                      className={`px-4 py-2 rounded-full font-medium transition-all ${
                        selectedPlatforms[platform]
                          ? 'bg-[#98cbff] text-[#0b1326] shadow-lg shadow-[#98cbff]/30'
                          : 'bg-[#222a3d] text-[#bec7d4] border border-[#3f4852] hover:border-[#98cbff]/50'
                      }`}
                    >
                      {platformLabels[platform]}
                    </button>
                  )
                })}
              </div>
              {activePlatformCount === 0 && (
                <p className="text-center text-[#bec7d4] text-sm mt-4">Select at least one platform to view skills</p>
              )}
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredSkills.map((skill: Skill, i: number) => (
                  <div 
                    key={i} 
                    className="bg-gradient-to-br from-[#222a3d] to-[#1a2236] border border-[#98cbff]/20 hover:border-[#98cbff]/50 rounded-xl p-6 text-center transition-all hover:shadow-lg hover:shadow-[#98cbff]/10 group cursor-pointer"
                  >
                    {/* Devicon Icon */}
                    <div className="mb-3 group-hover:scale-110 transition-transform flex justify-center">
                      {skill.iconName ? (
                        <i className={`${skill.iconName} text-4xl text-[#98cbff]`}></i>
                      ) : (
                        <div className="text-4xl">💻</div>
                      )}
                    </div>
                    <h3 className="font-bold text-[#dae2fd] mb-2">{skill.name}</h3>
                    
                    {/* Proficiency Bar */}
                    <div className="w-full bg-[#1a2236] rounded-full h-2 mb-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-[#98cbff] to-[#2fd9f4] h-full rounded-full transition-all"
                        style={{ width: `${skill.proficiency || 70}%` }}
                      ></div>
                    </div>
                    
                    {/* Level Badge and Percentage */}
                    <div className="flex justify-between items-center">
                      <span className="text-xs px-2 py-1 bg-[#98cbff]/10 border border-[#98cbff]/30 text-[#98cbff] rounded-full capitalize">
                        {skill.level || 'Intermediate'}
                      </span>
                      <p className="text-xs text-[#bec7d4]">{skill.proficiency || 70}%</p>
                    </div>
                  </div>
                ))}
              </div>
              {filteredSkills.length === 0 && (
                <div className="text-center py-12">
                  <span className="material-symbols-outlined text-5xl text-[#3f4852] mb-4 block">code</span>
                  <p className="text-[#bec7d4]">No skills available for selected platforms</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* CERTIFICATIONS TAB */}
        {activeTab === 'certifications' && certifications.length > 0 && (
          <section className="px-4 md:px-8 py-12">
            <h2 className="text-3xl md:text-4xl font-black mb-12 text-center">
              <span className="bg-gradient-to-r from-[#98cbff] to-[#2fd9f4] bg-clip-text text-transparent">Certifications & Achievements</span>
            </h2>
            
            <div className="max-w-4xl mx-auto space-y-4">
              {certifications.map((cert: Certification, i: number) => (
                <div 
                  key={i}
                  className="bg-[#222a3d] border border-[#98cbff]/20 hover:border-[#98cbff]/50 rounded-xl p-6 hover:shadow-lg hover:shadow-[#98cbff]/10 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-[#2fd9f4] text-2xl flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#dae2fd] mb-1">{cert.title}</h3>
                      <p className="text-[#bec7d4] text-sm mb-2">{cert.issuer}</p>
                      {cert.credentialUrl && (
                        <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-[#98cbff] text-sm hover:underline flex items-center gap-1">
                          View Credential <span className="material-symbols-outlined text-xs">open_in_new</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* RESUMES TAB */}
        {activeTab === 'resumes' && resumes.length > 0 && (
          <section className="px-4 md:px-8 py-12">
            <h2 className="text-3xl md:text-4xl font-black mb-8 text-center">
              <span className="bg-gradient-to-r from-[#98cbff] to-[#2fd9f4] bg-clip-text text-transparent">Resumes & Documents</span>
            </h2>
            
            {/* Platform Filter */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
                {(['isWeb', 'isAndroid', 'isIOS', 'isMac', 'isServer', 'isWindows'] as PlatformType[]).map((platform) => {
                  const platformLabels: Record<PlatformType, string> = {
                    isWeb: 'Web',
                    isAndroid: 'Android',
                    isIOS: 'iOS',
                    isMac: 'macOS',
                    isServer: 'Server',
                    isWindows: 'Windows',
                  }
                  return (
                    <button
                      key={platform}
                      onClick={() => togglePlatform(platform)}
                      className={`px-4 py-2 rounded-full font-medium transition-all ${
                        selectedPlatforms[platform]
                          ? 'bg-[#98cbff] text-[#0b1326] shadow-lg shadow-[#98cbff]/30'
                          : 'bg-[#222a3d] text-[#bec7d4] border border-[#3f4852] hover:border-[#98cbff]/50'
                      }`}
                    >
                      {platformLabels[platform]}
                    </button>
                  )
                })}
              </div>
              {activePlatformCount === 0 && (
                <p className="text-center text-[#bec7d4] text-sm mt-4">Select at least one platform to view resumes</p>
              )}
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResumes.map((resume: Resume, i: number) => (
                <div 
                  key={i}
                  className="bg-gradient-to-br from-[#222a3d] to-[#1a2236] border border-[#98cbff]/20 hover:border-[#98cbff]/50 rounded-xl p-6 hover:shadow-lg hover:shadow-[#98cbff]/10 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-3xl text-[#2fd9f4]">description</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-[#dae2fd]">{resume.fileName || 'Document'}</h3>
                      <p className="text-xs text-[#bec7d4]">{resume.fileType || 'PDF'}</p>
                    </div>
                  </div>
                  {resume.fileUrl && (
                    <a 
                      href={resume.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full py-2 bg-gradient-to-r from-[#98cbff] to-[#2fd9f4] text-[#0b1326] font-bold rounded-lg hover:shadow-lg hover:shadow-[#98cbff]/50 transition-all flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">download</span>
                      Download
                    </a>
                  )}
                </div>
              ))}
              {filteredResumes.length === 0 && (
                <div className="text-center py-12 md:col-span-2">
                  <span className="material-symbols-outlined text-5xl text-[#3f4852] mb-4 block">description</span>
                  <p className="text-[#bec7d4]">No resumes available for selected platforms</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* CONTACT TAB */}
        {activeTab === 'contact' && (
          <section className="px-4 md:px-8 py-12">
            <h2 className="text-3xl md:text-4xl font-black mb-12 text-center">
              <span className="bg-gradient-to-r from-[#98cbff] to-[#2fd9f4] bg-clip-text text-transparent">Let&apos;s Connect</span>
            </h2>
            
            <div className="max-w-2xl mx-auto">
              <ContactCard />
            </div>
          </section>
        )}
      </main>

      {/* Bottom Navigation - 6 Tabs */}
      <nav className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-[#0b1326] to-[#0b1326]/90 backdrop-blur-xl border-t border-[#98cbff]/10 z-40">
        <div className="flex justify-around items-center px-2 py-3">
          {[
            { id: 'home', label: 'HOME', icon: 'home' },
            { id: 'projects', label: 'PROJECTS', icon: 'rocket_launch' },
            { id: 'skills', label: 'SKILLS', icon: 'terminal' },
            { id: 'certifications', label: 'CERTS', icon: 'verified' },
            { id: 'resumes', label: 'RESUME', icon: 'description' },
            { id: 'contact', label: 'CONTACT', icon: 'send' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#98cbff] to-[#2fd9f4] text-[#0b1326] scale-105'
                  : 'text-[#dae2fd] hover:text-[#98cbff] hover:bg-[#222a3d]'
              }`}
            >
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: activeTab === tab.id ? "'FILL' 1" : "'FILL' 0" }}>
                {tab.icon}
              </span>
              <span className="text-[9px] md:text-[10px] font-bold tracking-wider">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default PublicPage
