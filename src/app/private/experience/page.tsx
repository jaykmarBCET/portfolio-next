'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useProfileStore } from '@/store/store'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Experience } from '@/types/types'



const ExperienceCard = ({ exp, onEdit, onDelete }: {
  exp: Experience
  onEdit: (exp: Experience) => void
  onDelete: (id: string) => void
}) => {
  const startDate = exp.startDate ? new Date(exp.startDate).toLocaleDateString() : ''
  const endDate = exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>{exp.position} at {exp.company}</CardTitle>
        <Badge>{startDate} - {endDate}</Badge>
      </CardHeader>
      <CardContent>
        {exp.description && <p className="text-sm">{exp.description}</p>}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button size="sm" onClick={() => onEdit(exp)}>Edit</Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => exp._id && onDelete(exp._id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

function ExperiencePage() {
  const {
    user,
    addExperience,
    deleteExperience,
    updateExperience,
    getExperiences,
    experiences = [],
  } = useProfileStore()

  const router = useRouter()
  const [form, setForm] = useState<Experience>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) router.replace('/private/login')
  }, [user, router])

  useEffect(() => {
    const fetchExperiences = async () => {
      setLoading(true)
      await getExperiences()
      setLoading(false)
    }
    fetchExperiences()
  }, [getExperiences])

  if (!addExperience || !updateExperience || !deleteExperience) {
    return <div>Store methods not available.</div>
  }

  const resetForm = () =>
    setForm({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    })

  const handleSubmit = async () => {
    if (!form.company || !form.position || !form.startDate) return

    // ✅ Keep date as string, not JS Date
    const experienceData = {
      company: form.company,
      position: form.position,
      startDate: form.startDate,
      endDate: form.endDate || undefined,
      description: form.description,
    }
    if(!experienceData)return;
    if (editingId) {
      await updateExperience(editingId, experienceData)
      setEditingId(null)
    } else {
      await addExperience(experienceData)
    }
    resetForm()
  }

  const handleEdit = (exp: Experience) => {
    setEditingId(exp._id!)
    setForm({
      _id: exp._id,
      company: exp.company,
      position: exp.position,
      startDate: exp.startDate ? new Date(exp.startDate).toISOString().split('T')[0] : '',
      endDate: exp.endDate ? new Date(exp.endDate).toISOString().split('T')[0] : '',
      description: exp.description || '',
    })
  }

  const handleDelete = (id: string) => {
    deleteExperience(id)
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Work Experience</h1>
      
      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Update Experience' : 'Add Experience'}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              placeholder="e.g., Google"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              placeholder="e.g., Software Engineer"
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date (Optional)</Label>
              <Input
                id="endDate"
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="e.g., Key responsibilities and achievements."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
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
          <p className="text-sm text-gray-500">Loading experiences...</p>
        ) : experiences.length === 0 ? (
          <p className="text-sm text-gray-500">No experiences yet.</p>
        ) : (
          <div className='flex flex-wrap gap-2'>
            {
              experiences&& experiences.length>0&&
            experiences.map((exp) => (
              <ExperienceCard
                key={exp._id! ?? exp.company}
                exp={exp}
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

export default ExperiencePage
