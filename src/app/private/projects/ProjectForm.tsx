import React, { useState } from 'react'
import { Project } from '@/types/types'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { technologies } from '@/constants/constant'

export const ProjectForm = ({
  mode,
  project,
  onCancel,
  onSave,
}: {
  mode: 'add' | 'edit'
  project?: Project
  onCancel: () => void
  onSave: (p: Project) => void
}) => {
  const [update, setUpdate] = useState<Project>(
    project || {
      title: '',
      description: '',
      liveUrl: '',
      githubUrl: '',
      imageUrl: '',
      technologies: [],
    }
  )

  const toggleTechnology = (tech: string) => {
    setUpdate((prev) => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter((t) => t !== tech)
        : [...prev.technologies, tech],
    }))
  }

  return (
    <Card className="p-6 shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle>{mode === 'add' ? 'Add New Project' : 'Update Project'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          value={update.title}
          onChange={(e) => setUpdate({ ...update, title: e.target.value })}
          placeholder="Project Title"
        />
        <Input
          value={update.description}
          onChange={(e) => setUpdate({ ...update, description: e.target.value })}
          placeholder="Short Description"
        />
        <Input
          value={update.githubUrl || ''}
          onChange={(e) => setUpdate({ ...update, githubUrl: e.target.value })}
          placeholder="GitHub URL"
        />
        <Input
          value={update.liveUrl || ''}
          onChange={(e) => setUpdate({ ...update, liveUrl: e.target.value })}
          placeholder="Live Demo URL"
        />
        <Input
          value={update.imageUrl || ''}
          onChange={(e) => setUpdate({ ...update, imageUrl: e.target.value })}
          placeholder="Project Image URL"
        />

        {/* Row-wise technology selection with border on selected */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, idx) => {
            const isSelected = update.technologies.includes(tech)
            return (
              <button
                key={idx}
                type="button"
                onClick={() => toggleTechnology(tech)}
                className={`px-3 py-1 flex justify-center flex-col rounded-lg transition border 
                  ${
                    isSelected
                      ? 'border-gray-500 hover:bg-gray-900 text-gray-900 hover:text-gray-200 bg-gray-200 '
                      : 'border-gray-500 hover:bg-gray-800 border-1 '
                  }`}
              >
                <i className={`devicon-${tech.toLowerCase()}-original devicon-${tech.toLowerCase()}-plain colored `}/> 
                <p className='text-[12px] font-semibold'>{tech}</p>
              </button>
            )
          })}
        </div>
      </CardContent>

      <CardFooter className="flex gap-3 justify-end">
        <Button onClick={() => onSave(update)}>
          {mode === 'add' ? 'Add' : 'Save'}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </CardFooter>
    </Card>
  )
}
