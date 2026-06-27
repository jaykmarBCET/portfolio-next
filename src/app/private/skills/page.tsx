'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useProfileStore } from '@/store/store'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Skill } from '@/types/types'

// Type for the form data
type SkillForm = {
  _id?: string
  name: string
  iconName?: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  isAndroid?: boolean
  isWeb?: boolean
  isISO?: boolean
  isWindows?: boolean
  isMac?: boolean
}

// Separate component for a single skill card
const SkillCard = ({ skill, onEdit, onDelete }: {
  skill: Skill
  onEdit: (skill: Skill) => void
  onDelete: (id: string) => void
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const platforms = [
    { key: 'isWeb', label: 'Web' },
    { key: 'isAndroid', label: 'Android' },
    { key: 'isISO', label: 'iOS' },
    { key: 'isWindows', label: 'Windows' },
    { key: 'isMac', label: 'Mac' }
  ]

  const activePlatforms = platforms.filter(p => skill[p.key as keyof Skill])

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete "${skill.name}"?`)) {
      setIsDeleting(true)
      if (skill._id) {
        await onDelete(skill._id)
      }
      setIsDeleting(false)
    }
  }

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow duration-300 border border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white">{skill.name}</CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-3">
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary" className="bg-blue-900 text-blue-100">{skill.level}</Badge>
            {skill.iconName && (
              <Badge variant="secondary" className="bg-purple-900 text-purple-100">
                <i style={{ fontSize: 16 }} className={`${skill.iconName} colored`}></i>
              </Badge>
            )}
          </div>
          {activePlatforms.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {activePlatforms.map(platform => (
                <Badge key={platform.key} variant="outline" className="border-green-600 text-green-300">
                  {platform.label}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-2">
        <Button 
          size="sm" 
          onClick={() => onEdit(skill)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Edit
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={handleDelete}
          disabled={isDeleting}
          className="bg-red-600 hover:bg-red-700"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </CardFooter>
    </Card>
  )
}

// Main page component
function SkillsPage() {
  const {
    user,
    getSkills,
    addSkill,
    deleteSkill,
    updateSkill,
    skills = [],
  } = useProfileStore()

  const router = useRouter()
  const [form, setForm] = useState<SkillForm>({
    name: '',
    level: 'Beginner',
    iconName: "",
    isAndroid: false,
    isWeb: false,
    isISO: false,
    isWindows: false,
    isMac: false
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!user) router.replace('/private/login')
  }, [user, router])

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true)
      await getSkills()
      setLoading(false)
    }
    fetchSkills()
  }, [getSkills])

  if (!addSkill || !updateSkill || !deleteSkill) {
    return <div className="p-6 text-white">Store methods not available.</div>
  }

  const resetForm = () => {
    setForm({
      name: '',
      level: 'Beginner',
      iconName: "",
      isAndroid: false,
      isWeb: false,
      isISO: false,
      isWindows: false,
      isMac: false
    })
    setEditingId(null)
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    
    if (!form.name.trim() || !form.level) {
      alert('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    try {
      if (editingId) {
        await updateSkill(editingId, form as Skill)
      } else {
        await addSkill({ ...form } as Skill)
      }
      resetForm()
    } catch (error) {
      console.error('Error submitting skill:', error)
      alert('Failed to submit skill. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (skill: Skill) => {
    setEditingId(skill._id!)
    setForm({
      _id: skill._id,
      name: skill.name,
      level: skill.level,
      iconName: skill.iconName || "",
      isAndroid: skill.isAndroid || false,
      isWeb: skill.isWeb || false,
      isISO: skill.isISO || false,
      isWindows: skill.isWindows || false,
      isMac: skill.isMac || false
    })
  }

  const handleDelete = async (id: string) => {
    await deleteSkill(id)
  }

  const handleCancel = () => {
    resetForm()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Skills Management</h1>
          <p className="text-gray-400">Add, edit, and manage your technical skills and platform expertise</p>
        </div>

        {/* Form Card */}
        <Card className="mb-8 bg-gray-800 border-gray-700">
          <CardHeader className="border-b border-gray-700">
            <CardTitle className="text-2xl text-white">
              {editingId ? '✏️ Update Skill' : '➕ Add New Skill'}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white font-semibold">Skill Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., JavaScript, React, Node.js"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level" className="text-white font-semibold">Skill Level *</Label>
                  <Select
                    value={form.level}
                    onValueChange={(value: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert') =>
                      setForm({ ...form, level: value })
                    }
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600 text-white">
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Icon Name */}
              <div className="space-y-2">
                <Label htmlFor="iconName" className="text-white font-semibold">Icon Class Name</Label>
                <Input
                  id="iconName"
                  placeholder="e.g., devicon-javascript-plain, devicon-react-original"
                  value={form.iconName}
                  onChange={(e) => setForm({ ...form, iconName: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              {/* Platform Selection */}
              <div className="space-y-3 bg-gray-700 p-4 rounded-lg">
                <Label className="text-white font-semibold block">Applicable Platforms/Stack</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {[
                    { key: 'isWeb', label: 'Web', icon: '🌐' },
                    { key: 'isAndroid', label: 'Android', icon: '🤖' },
                    { key: 'isISO', label: 'iOS', icon: '🍎' },
                    { key: 'isWindows', label: 'Windows', icon: '🪟' },
                    { key: 'isMac', label: 'Mac', icon: '💻' }
                  ].map(platform => (
                    <div 
                      key={platform.key} 
                      className="flex items-center space-x-2 cursor-pointer hover:bg-gray-600 p-2 rounded transition-colors"
                      onClick={() => setForm({ ...form, [platform.key]: !form[platform.key as keyof SkillForm] })}
                    >
                      <input
                        type="checkbox"
                        id={platform.key}
                        checked={form[platform.key as keyof SkillForm] as boolean || false}
                        onChange={(e) => setForm({ ...form, [platform.key]: e.target.checked })}
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

              {/* Form Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-600">
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6"
                >
                  {isSubmitting ? (editingId ? 'Updating...' : 'Adding...') : (editingId ? '✓ Update Skill' : '+ Add Skill')}
                </Button>
                {editingId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="border-gray-600 text-white hover:bg-gray-700"
                  >
                    ✕ Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Skills List Section */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Your Skills {skills.length > 0 && <span className="text-gray-400">({skills.length})</span>}
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-12">
              <div className="animate-spin">
                <svg className="w-8 h-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <p className="ml-3 text-gray-400">Loading skills...</p>
            </div>
          ) : skills.length === 0 ? (
            <Card className="bg-gray-800 border-gray-700 border-dashed">
              <CardContent className="flex flex-col items-center justify-center p-12">
                <div className="text-4xl mb-4">📚</div>
                <p className="text-gray-400 text-center">No skills added yet. Create your first skill using the form above!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <SkillCard
                  key={skill._id}
                  skill={skill}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SkillsPage