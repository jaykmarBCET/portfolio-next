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

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
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

      <CardHeader>
        <CardTitle className="text-lg font-semibold">{project.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-600">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {project.technologies.map((item, idx) => (
            <Badge key={idx} className="rounded-full bg-[#000000f9]  px-3 py-1 text-xs">
              {item}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 mt-3">
        <div className="flex gap-2 justify-start">
          {project.githubUrl && (
            <Button size="sm" variant="outline" onClick={goToGitHub}>
              <Github className="w-4 h-4 mr-1" /> GitHub
            </Button>
          )}
          {project.liveUrl && (
            <Button size="sm" variant="outline" onClick={goToLive}>
              <ExternalLink className="w-4 h-4 mr-1" /> Live
            </Button>
          )}
        </div>

        <div className="flex gap-2 justify-end">
          <Button size="sm" variant="outline" onClick={onEdit}>
            <Edit className="w-4 h-4 mr-1" /> Update
          </Button>
          <Button size="sm" variant="destructive" onClick={onDelete}>
            <Trash2 className="w-4 h-4 mr-1" /> Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

