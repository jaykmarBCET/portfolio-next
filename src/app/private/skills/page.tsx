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
}

// Separate component for a single skill card
const SkillCard = ({ skill, onEdit, onDelete }: {
  skill: Skill
  onEdit: (skill: Skill) => void
  onDelete: (id: string) => void
}) => {
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>{skill.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Badge variant="secondary">{skill.level}</Badge>
        {
          skill.iconName &&
          <Badge variant="secondary"><i style={{ fontSize: 25 }} className={`${skill.iconName} colored`}></i></Badge>

        }
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button size="sm" onClick={() => onEdit(skill)}>
          Edit
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => skill._id && onDelete(skill._id)}
        >
          Delete
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
    iconName:""
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

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
    return <div>Store methods not available.</div>
  }

  const resetForm = () =>
    setForm({
      name: '',
      level: 'Beginner',
      iconName:""
    })

  const handleSubmit = async () => {
    if (!form.name || !form.level) return

    if (editingId) {
      await updateSkill(editingId, form as Skill)
      setEditingId(null)
    } else {
      await addSkill({ ...form } as Skill)
    }
    resetForm()
  }

  const handleEdit = (skill: Skill) => {
    setEditingId(skill._id!)
    setForm({
      _id: skill._id,
      name: skill.name,
      level: skill.level,
      iconName: skill.iconName
    })
  }

  const handleDelete = async (id: string) => {
    await deleteSkill(id)
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Skills</h1>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Update Skill' : 'Add New Skill'}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Skill Name</Label>
            <Input
              id="name"
              placeholder="e.g., JavaScript, Project Management"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              id="iconName"
              placeholder="e.g., DevIcon Website"
              value={form.iconName}
              onChange={(e) => setForm({ ...form, iconName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="level">Skill Level</Label>
            <Select
              value={form.level}
              onValueChange={(value: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert') =>
                setForm({ ...form, level: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
                <SelectItem value="Expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit}>{editingId ? 'Update' : 'Add'}</Button>
          {editingId && (
            <Button
              variant="outline"
              className="ml-2"
              onClick={() => {
                setEditingId(null)
                resetForm()
              }}
            >
              Cancel
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* List */}
      <div className="grid gap-4">
        {loading ? (
          <p className="text-sm text-gray-500">Loading skills...</p>
        ) : skills.length === 0 ? (
          <p className="text-sm text-gray-500">No skills added yet.</p>
        ) : (
          <div className='flex flex-wrap gap-2'>
            {
              skills && skills.length > 0 &&

              skills.map((skill) => (
                <SkillCard
                  key={skill._id}
                  skill={skill}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default SkillsPage