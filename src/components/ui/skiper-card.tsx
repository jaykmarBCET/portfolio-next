'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { usePublicProfileStore } from '@/store/public.store'
import Image from 'next/image'
import { Facebook, Github, Linkedin, Twitter, LucideIcon, Download } from 'lucide-react'
import ShareButton, { ShareLink } from '@/components/ui/share-button'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

// Map of social media platforms to Lucide icons
const iconMap: Record<string, LucideIcon> = {
  LinkedIn: Linkedin,
  Github: Github,
  Twitter: Twitter,
  Facebook: Facebook,
  X: Twitter,
}

// Map of skill levels to badge variants
const levelVariantMap: Record<string, 'default' | 'secondary' | 'outline'> = {
  Beginner: 'secondary',
  Intermediate: 'default',
  Advanced: 'default',
  Expert: 'outline',
}

function PublicPage() {
  const {
    user,
    projects,
    languages,
    interests,
    certifications,
    experiences,
    skills,
    educationList,
    resumes,
    socialMedia,
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
  } = usePublicProfileStore()

  const [loading, setLoading] = useState(true)

  const fetchAllInfo = useCallback(async () => {
    setLoading(true)
    try {
      await Promise.all([
        getUser(),
        getProjects(),
        getLanguages(),
        getInterests(),
        getCertifications(),
        getExperiences(),
        getSkills(),
        getEducation(),
        getResumes(),
        getSocialMedia(),
      ])
    } catch (error) {
      console.error("Failed to fetch public profile data:", error)
    } finally {
      setLoading(false)
    }
  }, [
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
  ])

  useEffect(() => {
    fetchAllInfo()
  }, [fetchAllInfo])

  // Filter out any social media links that don't have a valid icon mapping
  const shareLinks: ShareLink[] = socialMedia
    .map(item => {
      const icon = iconMap[item.platform]
      if (!icon) return null
      return {
        label: item.platform,
        icon: icon,
        href: item.url,
      }
    })
    .filter(Boolean) as ShareLink[]

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  if (loading) {
    return (
      <div className='w-full min-h-screen flex items-center justify-center bg-gray-900'>
        <p className='text-white text-lg'>Loading profile...</p>
      </div>
    )
  }

  return (
    <div className='w-full min-h-screen flex flex-col items-center bg-gray-900 p-6'>
      {/* About Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        className='flex flex-wrap w-screen gap-8 items-center justify-center max-w-6xl mb-12'
      >
        {/* Avatar Section */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className='border-4 border-blue-500 shadow-xl rounded-full w-72 h-72 relative overflow-hidden'
        >
          <Image
            className='object-cover rounded-full'
            fill
            src={user ? (user.avatarUrl as string) : "https://placehold.co/288x288/2D3748/ffffff?text=User"}
            alt='Profile Image'
          />
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className='min-w-72 text-center sm:text-left'
        >
          <CardHeader className="p-0 mb-4">
            <CardTitle className='text-4xl font-bold italic text-white'>
              {user ? user?.name : "User Profile"}
            </CardTitle>
            <CardDescription className='text-gray-300 font-medium'>
              {user ? user.bio : "Loading bio..."}
            </CardDescription>
          </CardHeader>
          <CardContent className='p-0 flex justify-center sm:justify-start gap-4'>
            {shareLinks.length > 0 && (
              <ShareButton className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg' links={shareLinks}>
                Contact
              </ShareButton>
            )}
            {resumes.length > 0 && (
              <Button asChild className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg'>
                <a href={resumes[0].fileUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" /> Download Resume
                </a>
              </Button>
            )}
          </CardContent>
        </motion.div>
      </motion.div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">

        {/* Skills Section */}
        {skills.length > 0 && (
          <motion.div initial="hidden" animate="visible" variants={fadeInVariants} className="lg:col-span-1">
            <Card className="bg-gray-800 text-gray-200">
              <CardHeader>
                <CardTitle className="text-xl">Skills</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill._id} variant={levelVariantMap[skill.level]}>
                    {skill.name}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Experience Section */}
        {experiences.length > 0 && (
          <motion.div initial="hidden" animate="visible" variants={fadeInVariants} className="lg:col-span-2">
            <Card className="bg-gray-800 text-gray-200">
              <CardHeader>
                <CardTitle className="text-xl">Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp._id} className="border-b border-gray-700 pb-4 last:border-b-0">
                    <h3 className="text-lg font-bold text-white">{exp.position}</h3>
                    <p className="text-sm text-gray-400">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                    <p className="mt-2 text-sm">{exp.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Education Section */}
        {educationList.length > 0 && (
          <motion.div initial="hidden" animate="visible" variants={fadeInVariants} className="lg:col-span-2">
            <Card className="bg-gray-800 text-gray-200">
              <CardHeader>
                <CardTitle className="text-xl">Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {educationList.map((edu) => (
                  <div key={edu._id} className="border-b border-gray-700 pb-4 last:border-b-0">
                    <h3 className="text-lg font-bold text-white">{edu.institution}</h3>
                    <p className="text-sm text-gray-400">{edu.degree} in {edu.fieldOfStudy}</p>
                    <p className="mt-1 text-xs text-gray-500">{edu.startDate.toLocaleDateString()} - {edu.endDate.toLocaleString()}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <motion.div initial="hidden" animate="visible" variants={fadeInVariants} className="lg:col-span-3">
            <Card className="bg-gray-800 text-gray-200">
              <CardHeader>
                <CardTitle className="text-xl">Projects</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                  <div key={project._id} className="p-4 bg-gray-700 rounded-lg">
                    <h3 className="text-lg font-bold text-white">{project.title}</h3>
                    <p className="text-sm text-gray-400">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm">
                          View Project
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Certifications Section */}
        {certifications.length > 0 && (
          <motion.div initial="hidden" animate="visible" variants={fadeInVariants} className="lg:col-span-1">
            <Card className="bg-gray-800 text-gray-200">
              <CardHeader>
                <CardTitle className="text-xl">Certifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert._id}>
                    <h3 className="font-bold">{cert.title}</h3>
                    <p className="text-sm text-gray-400">{cert.issuer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Languages Section */}
        {languages.length > 0 && (
          <motion.div initial="hidden" animate="visible" variants={fadeInVariants} className="lg:col-span-1">
            <Card className="bg-gray-800 text-gray-200">
              <CardHeader>
                <CardTitle className="text-xl">Languages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang._id}>
                    <h3 className="font-bold">{lang.name}</h3>
                    <p className="text-sm text-gray-400">{lang.fluency}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Interests Section */}
        {interests.length > 0 && (
          <motion.div initial="hidden" animate="visible" variants={fadeInVariants} className="lg:col-span-1">
            <Card className="bg-gray-800 text-gray-200">
              <CardHeader>
                <CardTitle className="text-xl">Interests</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <Badge key={interest._id} variant="secondary">
                    {interest.name}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

      </div>
    </div>
  )
}

export default PublicPage
