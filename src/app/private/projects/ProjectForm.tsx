import React, { useState, useEffect } from 'react'
import { Project, Skill } from '@/types/types'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { technologies } from '@/constants/constant'
import { useProfileStore } from '@/store/store'

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
  const { skills, getSkills } = useProfileStore()
  const [update, setUpdate] = useState<Project>(
    project || {
      title: '',
      description: '',
      liveUrl: '',
      githubUrl: '',
      imageUrl: '',
      technologies: [],
      skills: [],
      isAndroid: false,
      isIOS: false,
      isMac: false,
      isWeb: false,
      isServer: false,
      isWindows: false,
    }
  )
  const [availableSkills, setAvailableSkills] = useState<Skill[]>([])
  const [draggedSkill, setDraggedSkill] = useState<Skill | null>(null)

  useEffect(() => {
    getSkills()
  }, [getSkills])

  useEffect(() => {
    setAvailableSkills(skills.filter(skill => !update.skills?.includes(skill._id!)))
  }, [skills, update.skills])

  const toggleTechnology = (tech: string) => {
    setUpdate((prev) => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter((t) => t !== tech)
        : [...prev.technologies, tech],
    }))
  }

  const handleDragStart = (skill: Skill) => {
    setDraggedSkill(skill)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (draggedSkill && !update.skills?.includes(draggedSkill._id!)) {
      setUpdate(prev => ({
        ...prev,
        skills: [...(prev.skills || []), draggedSkill._id!]
      }))
    }
    setDraggedSkill(null)
  }

  const removeSkill = (skillId: string) => {
    setUpdate(prev => ({
      ...prev,
      skills: prev.skills?.filter(id => id !== skillId) || []
    }))
  }

  const platforms = [
    { key: 'isWeb', label: 'Web', icon: '🌐' },
    { key: 'isAndroid', label: 'Android', icon: '🤖' },
    { key: 'isIOS', label: 'iOS', icon: '🍎' },
    { key: 'isWindows', label: 'Windows', icon: '🪟' },
    { key: 'isMac', label: 'Mac', icon: '💻' },
    { key: 'isServer', label: 'Server', icon: '🖥️' }
  ]

  return (
    <Card className="p-6 shadow-lg rounded-xl bg-gray-800 border-gray-700">
      <CardHeader className="border-b border-gray-600">
        <CardTitle className="text-2xl text-white">
          {mode === 'add' ? '➕ Add New Project' : '✏️ Update Project'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white font-semibold">Project Title *</Label>
            <Input
              id="title"
              value={update.title}
              onChange={(e) => setUpdate({ ...update, title: e.target.value })}
              placeholder="My Awesome Project"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="githubUrl" className="text-white font-semibold">GitHub URL *</Label>
            <Input
              id="githubUrl"
              value={update.githubUrl || ''}
              onChange={(e) => setUpdate({ ...update, githubUrl: e.target.value })}
              placeholder="https://github.com/username/project"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-white font-semibold">Description *</Label>
          <Input
            id="description"
            value={update.description}
            onChange={(e) => setUpdate({ ...update, description: e.target.value })}
            placeholder="Brief description of your project"
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="liveUrl" className="text-white font-semibold">Live Demo URL</Label>
            <Input
              id="liveUrl"
              value={update.liveUrl || ''}
              onChange={(e) => setUpdate({ ...update, liveUrl: e.target.value })}
              placeholder="https://myproject.com"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl" className="text-white font-semibold">Project Image URL</Label>
            <Input
              id="imageUrl"
              value={update.imageUrl || ''}
              onChange={(e) => setUpdate({ ...update, imageUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Platform Selection */}
        <div className="space-y-3 bg-gray-700 p-4 rounded-lg">
          <Label className="text-white font-semibold block">Project Platforms</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {platforms.map(platform => (
              <div
                key={platform.key}
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-600 p-2 rounded transition-colors"
                onClick={() => setUpdate({ ...update, [platform.key]: !update[platform.key as keyof Project] })}
              >
                <input
                  type="checkbox"
                  id={platform.key}
                  checked={update[platform.key as keyof Project] as boolean || false}
                  onChange={(e) => setUpdate({ ...update, [platform.key]: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-400 cursor-pointer accent-blue-600"
                />
                <label
                  htmlFor={platform.key}
                  className="text-sm font-medium cursor-pointer text-white flex items-center gap-1"
                >
                  <span>{platform.icon}</span>
                  {platform.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Selection */}
        <div className="space-y-3">
          <Label className="text-white font-semibold block">Technologies Used *</Label>
          <div className="flex flex-wrap gap-2 p-4 bg-gray-700 rounded-lg">
            {technologies.map((tech, idx) => {
              const isSelected = update.technologies.includes(tech)
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleTechnology(tech)}
                  className={`px-3 py-2 flex justify-center flex-col rounded-lg transition-all border ${
                    isSelected
                      ? 'border-blue-500 bg-blue-900 text-white shadow-lg'
                      : 'border-gray-500 hover:bg-gray-600 text-gray-300'
                  }`}
                >
                  <i className={`devicon-${tech.toLowerCase()}-original colored text-lg`} />
                  <p className='text-[10px] font-semibold mt-1'>{tech}</p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Skills Selection with Drag & Drop */}
        <div className="space-y-3">
          <Label className="text-white font-semibold block">Skills Used (Drag & Drop)</Label>

          {/* Selected Skills */}
          <div
            className="min-h-[100px] p-4 bg-gray-700 rounded-lg border-2 border-dashed border-gray-500"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <p className="text-gray-400 text-sm mb-2">Drop skills here:</p>
            <div className="flex flex-wrap gap-2">
              {update.skills?.map(skillId => {
                const skill = skills.find(s => s._id === skillId)
                if (!skill) return null
                return (
                  <div
                    key={skillId}
                    className="bg-blue-900 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                  >
                    {skill.iconName && <i className={`${skill.iconName} colored text-xs`}></i>}
                    {skill.name}
                    <button
                      onClick={() => removeSkill(skillId)}
                      className="text-red-400 hover:text-red-300 ml-1"
                    >
                      ×
                    </button>
                  </div>
                )
              })}
              {(!update.skills || update.skills.length === 0) && (
                <p className="text-gray-500 italic">No skills selected yet</p>
              )}
            </div>
          </div>

          {/* Available Skills */}
          <div className="space-y-2">
            <p className="text-gray-400 text-sm">Available Skills (drag to add):</p>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {availableSkills.map(skill => (
                <div
                  key={skill._id}
                  draggable
                  onDragStart={() => handleDragStart(skill)}
                  className="bg-gray-600 text-white px-3 py-1 rounded-full cursor-move hover:bg-gray-500 transition-colors flex items-center gap-2 text-sm"
                >
                  {skill.iconName && <i className={`${skill.iconName} colored text-xs`}></i>}
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-3 justify-end pt-6 border-t border-gray-600">
        <Button
          onClick={() => onSave(update)}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6"
        >
          {mode === 'add' ? '+ Add Project' : '✓ Save Changes'}
        </Button>
        <Button
          variant="outline"
          onClick={onCancel}
          className="border-gray-600 text-white hover:bg-gray-700"
        >
          ✕ Cancel
        </Button>
      </CardFooter>
    </Card>
  )
}
