'use client'
import React, { useCallback, useEffect } from 'react'
import { usePublicProfileStore } from '@/store/public.store'
import AboutCard from '@/components/AboutCard'
import SkillsCard from '@/components/SkillsCard'
import ProjectCard from '@/components/ProjectCard'
import EducationCard from '@/components/EducationCard'
import ExperienceCard from '@/components/ExpreriencesCard'
import CertificationCard from '@/components/CertificationCard'
import InterestLanguageCard from '@/components/InterestLanguageCard'
import ContactCard from '@/components/ContactCard'

function PublicPage() {
  const {
    getUser,
    getProjects,
    getLanguages,
    getInterests,
    getCertifications,
    getExperiences,
    getSkills,
    getEducation,
    getResumes,
    getSocialMedia,
    skills,
    projects,
    educationList,
    experiences,
    certifications,
    languages
  } = usePublicProfileStore()

  const handelAllInfo = useCallback(async () => {
    await getUser()
    await getCertifications()
    await getEducation()
    await getExperiences()
    await getInterests()
    await getLanguages()
    await getProjects()
    await getResumes()
    await getSkills()
    await getSocialMedia()
  }, [getCertifications, getEducation, getExperiences, getInterests, getLanguages, getProjects, getResumes, getSkills, getSocialMedia, getUser])

  useEffect(() => {
    handelAllInfo()
  }, [handelAllInfo])
  
  return (
    <div className='w-full overflow-x-hidden  min-h-screen flex flex-col   items-center absolute top-0 left-0 bg-gray-900 '>
      {/* about Card */}
      <AboutCard />
      {/* Skills */}
      {
        skills.length>0 &&
        <SkillsCard />
      }
      {/* Projects */}
      {
        projects.length>0 &&
        <ProjectCard />
      }
      {/* Education */}
      {
        educationList.length>0 &&
        <EducationCard />
      }
      {/* Experience */}
      {
        experiences.length>0 &&
        <ExperienceCard />
      }
      {/* Certification */}
      {
        certifications.length>0 &&
        <CertificationCard />
      }
      {/* Interest Language */}
      {
        languages.length>0 &&
        <InterestLanguageCard />
      }
      {/* Contact */}
      <ContactCard />
    </div>
  )
}

export default PublicPage
