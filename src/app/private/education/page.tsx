'use client'
import { useProfileStore } from '@/store/store'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Education } from '@/types/types'
import { Label } from '@/components/ui/label'

// Type for the form data
type EducationForm = {
  _id?: string
  institution: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate: string
  grade?: string
  description?: string
}

// Separate component for a single education card
const EducationCard = ({ edu, onEdit, onDelete }: {
  edu: Education
  onEdit: (edu: Education) => void
  onDelete: (id: string) => void
}) => {
  const startDate = edu.startDate ? new Date(edu.startDate).toLocaleDateString() : '';
  const endDate = edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'Present';

  return (
    <Card className="p-4 w-96 h-44 overflow-hidden">
      <CardHeader>
        <CardTitle>{edu.degree} in {edu.fieldOfStudy}</CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{edu.institution}</Badge>
          <Badge>{startDate} - {endDate}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {edu.grade && <p className="text-sm text-muted-foreground mb-2">Grade: {edu.grade}</p>}
        {edu.description && <p className="text-sm">{edu.description}</p>}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button size="sm" onClick={() => onEdit(edu)}>Edit</Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => edu._id && onDelete(edu._id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

function EducationPage() {
  const {
    user,
    addEducation,
    deleteEducation,
    updateEducation,
    getEducation,
    educationList = [],
  } = useProfileStore()

  const router = useRouter()
  const [form, setForm] = useState<EducationForm>({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    grade: '',
    description: '',
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) router.replace('/private/login')
  }, [user, router])

  useEffect(() => {
    const fetchEducation = async () => {
      setLoading(true)
      await getEducation()
      setLoading(false)
    }
    fetchEducation()
  }, [getEducation])

  if (!addEducation || !updateEducation || !deleteEducation) {
    return <div>Store methods not available.</div>
  }

  const resetForm = () =>
    setForm({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      grade: '',
      description: '',
    })

  const handleSubmit = async () => {
    if (!form.institution || !form.degree || !form.fieldOfStudy || !form.startDate || !form.endDate) {
      return
    }

    const educationData = {
      ...form,
      startDate: new Date(form.startDate),
      endDate: new Date(form.endDate),
    }

    if (editingId) {
      await updateEducation(editingId, educationData)
      setEditingId(null)
    } else {
      await addEducation(educationData)
    }
    resetForm()
  }

  const handleEdit = (edu: Education) => {
    setEditingId(edu._id!)
    setForm({
      _id: edu._id,
      institution: edu.institution,
      degree: edu.degree,
      fieldOfStudy: edu.fieldOfStudy,
      startDate: edu.startDate ? new Date(edu.startDate).toISOString().split('T')[0] : '',
      endDate: edu.endDate ? new Date(edu.endDate).toISOString().split('T')[0] : '',
      grade: edu.grade || '',
      description: edu.description || '',
    })
  }

  const handleDelete = (id: string) => {
    deleteEducation(id)
  }

  return (
    <div className="mx-auto w-screen gap-y-5 flex flex-col overflow-x-hidden ">
      <h1 className="text-2xl font-bold ml-10">Education</h1>

      {/* Form */}
      <Card className='mx-8 mt-3 bg-white text-black'>
        <CardHeader>
          <CardTitle>{editingId ? 'Update Education' : 'Add Education'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3"> {/* pehle grid gap-4 tha */}
          <div>
            <Label htmlFor="institution" className="text-sm">Institution</Label>
            <Input
              id="institution"
              placeholder="e.g., University of Cambridge"
              value={form.institution}
              onChange={(e) => setForm({ ...form, institution: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="degree" className="text-sm">Degree</Label>
            <Input
              id="degree"
              placeholder="e.g., Bachelor of Science"
              value={form.degree}
              onChange={(e) => setForm({ ...form, degree: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="fieldOfStudy" className="text-sm">Field of Study</Label>
            <Input
              id="fieldOfStudy"
              placeholder="e.g., Computer Science"
              value={form.fieldOfStudy}
              onChange={(e) => setForm({ ...form, fieldOfStudy: e.target.value })}
            />
          </div>

          {/* Dates side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="startDate" className="text-sm">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="endDate" className="text-sm">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="grade" className="text-sm">Grade (Optional)</Label>
            <Input
              id="grade"
              placeholder="e.g., A, 4.0 GPA"
              value={form.grade}
              onChange={(e) => setForm({ ...form, grade: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-sm">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="e.g., Relevant coursework, honors, or activities."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button onClick={handleSubmit}>{editingId ? 'Update' : 'Add'}</Button>
          {editingId && (
            <Button
              variant="outline"
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
          <p className="text-sm text-gray-500">Loading education...</p>
        ) : educationList.length === 0 ? (
          <p className="text-sm text-gray-500">No education entries yet.</p>
        ) : (
          <div className='flex flex-wrap gap-2 justify-center  items-center'>
            { educationList&&educationList.length>0&&
              educationList.map((edu) => (
                <EducationCard
                  key={edu._id ?? edu.institution}
                  edu={edu}
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

export default EducationPage