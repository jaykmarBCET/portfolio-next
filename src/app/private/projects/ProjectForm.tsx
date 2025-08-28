import React, {  useState } from 'react'
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
  mode: "add" | "edit"
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

  return (
    <Card className="p-6 shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle>{mode === "add" ? "Add New Project" : "Update Project"}</CardTitle>
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

        <select
          multiple
          value={update.technologies}
          onChange={(e) => {
            const selected = Array.from(
              e.target.selectedOptions,
              (option) => option.value
            )
            setUpdate({ ...update, technologies: selected })
          }}
          className="border rounded p-2 w-full"
        >
          {technologies.map((item, idx) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
        </select>
      </CardContent>

      <CardFooter className="flex gap-3 justify-end">
        <Button onClick={() => onSave(update)}>
          {mode === "add" ? "Add" : "Save"}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </CardFooter>
    </Card>
  )
}