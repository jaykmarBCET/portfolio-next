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
import { Language } from '@/types/types'

// Type for the form data


// Separate component for a single language card
const LanguageCard = ({ lang, onEdit, onDelete }: {
  lang: Language
  onEdit: (lang: Language) => void
  onDelete: (id: string) => void
}) => {
  return (
    <Card className="p-3">
      <CardHeader className="p-2">
        <CardTitle className="text-base">{lang.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <Badge variant="secondary">{lang.fluency}</Badge>
      </CardContent>
      <CardFooter className="flex gap-2 p-2">
        <Button size="sm" onClick={() => onEdit(lang)}>
          Edit
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => lang._id && onDelete(lang._id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

// Main page component
function LanguagePage() {
  const {
    user,
    languages = [],
    getLanguages,
    addLanguage,
    updateLanguage,
    deleteLanguage,
  } = useProfileStore()

  const router = useRouter()
  const [form, setForm] = useState<Language>({
    name: '',
    fluency: 'Beginner',
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) router.replace('/private/login')
  }, [user, router])

  useEffect(() => {
    const fetchLanguages = async () => {
      setLoading(true)
      await getLanguages()
      setLoading(false)
    }
    fetchLanguages()
  }, [getLanguages])

  if (!addLanguage || !updateLanguage || !deleteLanguage) {
    return <div>Store methods not available.</div>
  }

  const resetForm = () =>
    setForm({
      name: '',
      fluency: 'Beginner',
    })

  const handleSubmit = async () => {
    if (!form.name || !form.fluency) return

    if (editingId) {
      await updateLanguage(editingId, form)
      setEditingId(null)
    } else {
      await addLanguage({ ...form })
    }
    resetForm()
  }

  const handleEdit = (lang: Language) => {
    setEditingId(lang._id!)
    setForm({
      _id: lang._id,
      name: lang.name,
      fluency: lang.fluency,
    })
  }

  const handleDelete = (id: string) => {
    deleteLanguage(id)
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Languages</h1>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Update Language' : 'Add Language'}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="space-y-2">
            <Label htmlFor="name">Language Name</Label>
            <Input
              id="name"
              placeholder="e.g., Spanish, Hindi"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fluency">Fluency</Label>
            <Select
              onValueChange={(value) => setForm({ ...form, fluency: value as 'Beginner' | 'Intermediate' | 'Advanced' | 'Native' })}
              value={form.fluency}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select fluency level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
                <SelectItem value="Native">Native</SelectItem>
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
      <div className="grid gap-2">
        {loading ? (
          <p className="text-sm text-gray-500">Loading languages...</p>
        ) : languages.length === 0 ? (
          <p className="text-sm text-gray-500">No languages added yet.</p>
        ) : (
          <div className='flex flex-wrap gap-2'>
            {
              languages.map((lang) => (
                <LanguageCard
                  key={lang._id}
                  lang={lang}
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

export default LanguagePage
