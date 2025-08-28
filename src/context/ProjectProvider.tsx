import { AllEndPoint } from "@/constants/constant"
import { Project } from "@/types/types"
import axios from "axios"
import React, { useState } from "react"
import { ProjectContext } from "./project.context"

export const ProjectProvider = ({ children }: React.PropsWithChildren) => {
  const [project, setProject] = useState<Project | null>(null)

  const getProject = async (projectId: string) => {
    try {
      const token = (await axios.get("/api/get-signature")).data
      if (!token) return

      const response = await axios.get(
        `${AllEndPoint.apiProjectsPublic}?projectId=${projectId}`,
        {
          headers: {
            signature: token,
          },
        }
      )
      setProject(response.data)
    } catch (error) {
      console.error("Failed to fetch project:", error)
    }
  }

  return (
    <ProjectContext.Provider value={{ project, getProject }}>
      {children}
    </ProjectContext.Provider>
  )
}
