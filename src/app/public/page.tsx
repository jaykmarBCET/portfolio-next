'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { usePublicProfileStore } from '@/store/public.store'
import AboutCard from '@/components/AboutCard'
import SkillsCard from '@/components/SkillsCard'
import ProjectCard from '@/components/ProjectCard'
import EducationCard from '@/components/EducationCard'
import ExperienceCard from '@/components/ExpreriencesCard'
import CertificationCard from '@/components/CertificationCard'
import InterestLanguageCard from '@/components/InterestLanguageCard'
import ContactCard from '@/components/ContactCard'
import {CircleLoader,ClimbingBoxLoader,BarLoader} from 'react-spinners'

function PublicPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
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
    try {
      setIsLoading(true)
      await getUser()
      await getSkills()
      await getProjects()
      await getLanguages()
      await getResumes()
      await getEducation()
      await getCertifications()
      await getExperiences()
      await getInterests()
      await getSocialMedia()
    } catch (error) {
      
    }finally{
      setIsLoading(false);
    }
  }, [getCertifications, getEducation, getExperiences, getInterests, getLanguages, getProjects, getResumes, getSkills, getSocialMedia, getUser])

  useEffect(() => {
    handelAllInfo()
  }, [handelAllInfo])

  if(isLoading){
    return <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <CircleLoader color='white' size={100}/>
      <ClimbingBoxLoader size={20} color='white'/>
      <p className='text-sm italic mt-5'>Please wait while loading page...</p>
       </div>
  }
  
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
