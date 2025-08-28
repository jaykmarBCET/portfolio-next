'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useProfileStore } from '@/store/store'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Interest } from '@/types/types'

// Type for the form data
type InterestForm = {
  _id?: string
  name: string
  description?: string
}

// Separate component for a single interest card
const InterestCard = ({ interest, onEdit, onDelete }: {
  interest: Interest
  onEdit: (interest: Interest) => void
  onDelete: (id: string) => void
}) => {
  return (
    <Card className="p-3">
      <CardHeader className="p-2">
        <CardTitle className="text-base">{interest.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        {interest.description && (
          <p className="text-sm text-muted-foreground">{interest.description}</p>
        )}
      </CardContent>
      <CardFooter className="flex gap-2 p-2">
        <Button size="sm" onClick={() => onEdit(interest)}>Edit</Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => onDelete(interest._id!)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

// Main page component
function InterestPage() {
  const {
    user,
    addInterest,
    updateInterest,
    deleteInterest,
    getInterests,
    interests = [],
  } = useProfileStore()

  const router = useRouter()
  const [form, setForm] = useState<InterestForm>({
    name: '',
    description: '',
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) router.replace('/private/login')
  }, [user, router])

  useEffect(() => {
    const fetchInterests = async () => {
      setLoading(true)
      await getInterests()
      setLoading(false)
    }
    fetchInterests()
  }, [getInterests])

  if (!addInterest || !updateInterest || !deleteInterest) {
    return <div>Store methods not available.</div>
  }

  const resetForm = () => setForm({ name: '', description: '' })

  const handleSubmit = async () => {
    if (!form.name) return

    if (editingId) {
      await updateInterest(editingId, form)
      setEditingId(null)
    } else {
      await addInterest({ ...form })
    }
    resetForm()
  }

  const handleEdit = (interest: Interest) => {
    setEditingId(interest._id!)
    setForm({
      _id: interest._id,
      name: interest.name,
      description: interest.description || '',
    })
  }

  const handleDelete = (id: string) => {
    deleteInterest(id)
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-semibold">Interests</h1>

      {/* Form */}
      <Card>
        <CardHeader className="p-3">
          <CardTitle className="text-lg">{editingId ? 'Update Interest' : 'Add Interest'}</CardTitle>
        </CardHeader>
        <CardContent className="p-3 space-y-3">
          <div>
            <Label htmlFor="name">Interest Name</Label>
            <Input
              id="name"
              placeholder="e.g., Photography, Hiking"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="e.g., I enjoy street photography."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
        </CardContent>
        <CardFooter className="p-3 flex gap-2">
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
      <div className="grid gap-3">
        {loading ? (
          <p className="text-sm text-gray-500">Loading interests...</p>
        ) : interests.length === 0 ? (
          <p className="text-sm text-gray-500">No interests yet.</p>
        ) : (
          <div className='flex flex-wrap gap-2'>
            {
              interests&& interests.length>0 &&
              interests.map((interest) => (
                <InterestCard
                  key={interest._id}
                  interest={interest}
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

export default InterestPage
