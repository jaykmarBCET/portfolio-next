import type { Project } from '@/types/types'
import { createContext, useContext } from 'react'

interface ProjectContextInfo {
  project: Project | null
  getProject: (projectId: string) => Promise<void>
}

// Default value set to undefined instead of null for stricter typing
export const ProjectContext = createContext<ProjectContextInfo | undefined>(
  undefined
)

export const useProject = () => {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider")
  }
  return context
}
