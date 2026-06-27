import React from 'react'
import { Project } from '@/types/types'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Github, ExternalLink, Edit, Trash2 } from "lucide-react"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export const ProjectCard = ({
  project,
  onEdit,
  onDelete,
}: {
  project: Project
  onEdit: () => void
  onDelete: () => void
}) => {
  const goToGitHub = () => project.githubUrl && window.open(project.githubUrl, "_blank")
  const goToLive = () => project.liveUrl && window.open(project.liveUrl, "_blank")

  const platforms = [
    { key: 'isWeb', label: 'Web', icon: '🌐' },
    { key: 'isAndroid', label: 'Android', icon: '🤖' },
    { key: 'isIOS', label: 'iOS', icon: '🍎' },
    { key: 'isWindows', label: 'Windows', icon: '🪟' },
    { key: 'isMac', label: 'Mac', icon: '💻' },
    { key: 'isServer', label: 'Server', icon: '🖥️' }
  ]

  const activePlatforms = platforms.filter(p => project[p.key as keyof Project])

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl bg-gray-800 border-gray-700">
      {project.imageUrl && (
        <div className="relative w-full h-40">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <CardHeader className="border-b border-gray-600">
        <CardTitle className="text-xl font-semibold text-white">{project.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-gray-300">{project.description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((item, idx) => (
            <Badge key={idx} className="rounded-full bg-blue-900 text-blue-100 px-3 py-1 text-xs">
              {item}
            </Badge>
          ))}
        </div>

        {/* Platforms */}
        {activePlatforms.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-gray-400 mr-2">Platforms:</span>
            {activePlatforms.map(platform => (
              <Badge key={platform.key} variant="outline" className="border-green-600 text-green-300 text-xs">
                {platform.icon} {platform.label}
              </Badge>
            ))}
          </div>
        )}

        {/* Skills */}
        {project.skills && project.skills.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs text-gray-400">Skills Used:</span>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skillId, idx) => {
                // Since skills are populated, we need to handle the populated skill objects
                const skill = typeof skillId === 'object' && skillId !== null ? skillId as { _id: string; name: string; iconName?: string; level: string } : null
                if (!skill) return null
                return (
                  <Badge key={idx} className="bg-purple-900 text-purple-100 text-xs flex items-center gap-1">
                    {skill.iconName && <i className={`${skill.iconName} colored text-xs`}></i>}
                    {skill.name}
                  </Badge>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-3 mt-3 border-t border-gray-600 pt-4">
        <div className="flex gap-2 justify-start w-full">
          {project.githubUrl && (
            <Button size="sm" variant="outline" onClick={goToGitHub} className="border-gray-600 text-white hover:bg-gray-700">
              <Github className="w-4 h-4 mr-1" /> GitHub
            </Button>
          )}
          {project.liveUrl && (
            <Button size="sm" variant="outline" onClick={goToLive} className="border-gray-600 text-white hover:bg-gray-700">
              <ExternalLink className="w-4 h-4 mr-1" /> Live
            </Button>
          )}
        </div>

        <div className="flex gap-2 justify-end w-full">
          <Button size="sm" variant="outline" onClick={onEdit} className="border-gray-600 text-white hover:bg-gray-700">
            <Edit className="w-4 h-4 mr-1" /> Update
          </Button>
          <Button size="sm" variant="destructive" onClick={onDelete} className="bg-red-600 hover:bg-red-700">
            <Trash2 className="w-4 h-4 mr-1" /> Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

