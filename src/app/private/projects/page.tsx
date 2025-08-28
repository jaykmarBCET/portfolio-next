'use client'
import React, { useEffect, useState } from 'react'
import { Project } from '@/types/types'
import { Button } from '@/components/ui/button'
import { useProfileStore } from '@/store/store'
import { useRouter } from 'next/navigation'
import { ProjectForm } from './ProjectForm'
import { ProjectCard } from './ProjectCard'

function ProjectPage() {
  const { user, projects, updateProject, addProject, deleteProject, getProjects } =
    useProfileStore()
  const router = useRouter()
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState<Project | null>(null)

  useEffect(() => {
    if (!user) {
      router.replace('/private/login')
    }
  }, [user])

  useEffect(() => {
    getProjects()
  }, [])

  if (!addProject || !updateProject || !deleteProject) {
    return <h1>Empty data</h1>
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Manage Projects</h1>

      {/* Add Project Button */}
      {!adding && !editing && (
        <Button onClick={() => setAdding(true)}>+ Add Project</Button>
      )}

      {/* Add Form */}
      {adding && (
        <ProjectForm
          mode="add"
          onCancel={() => setAdding(false)}
          onSave={(p) => {
            addProject(p)
            setAdding(false)
          }}
        />
      )}

      {/* Edit Form */}
      {editing && (
        <ProjectForm
          mode="edit"
          project={editing}
          onCancel={() => setEditing(null)}
          onSave={(p) => {
            updateProject(p._id!, p)
            setEditing(null)
          }}
        />
      )}

      {/* List Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <ProjectCard
            key={p._id}
            project={p}
            onEdit={() => setEditing(p)}
            onDelete={() => deleteProject(p._id!)}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectPage
