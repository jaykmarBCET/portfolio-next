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
import { FaLinkedin, FaGithub, FaTwitter, FaGlobe } from 'react-icons/fa'
import { SocialMedia } from '@/types/types'

// Type for the form data
type SocialMediaForm = {
  _id?: string
  platform: string
  url: string
  icon?: string
  username?: string
}

// Separate component for a single social media card
const SocialMediaCard = ({ socialMedia, onEdit, onDelete }: {
  socialMedia: SocialMedia
  onEdit: (socialMedia: SocialMedia) => void
  onDelete: (id: string) => void
}) => {
  // Function to determine the icon based on the platform
  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return <FaLinkedin className="h-6 w-6 text-blue-700" />
      case 'github':
        return <FaGithub className="h-6 w-6 text-gray-800" />
      case 'twitter':
      case 'x':
        return <FaTwitter className="h-6 w-6 text-black" />
      default:
        return <FaGlobe className="h-6 w-6 text-gray-500" />
    }
  }

  return (
    <Card className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {getIcon(socialMedia.platform)}
        <div>
          <CardTitle className="text-base font-medium">{socialMedia.platform}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {socialMedia.username || 'Link'}
          </p>
          <a
            href={socialMedia.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline truncate"
          >
            {socialMedia.url}
          </a>
        </div>
      </div>
      <CardFooter className="flex gap-2 p-0">
        <Button size="sm" onClick={() => onEdit(socialMedia)}>
          Edit
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => socialMedia._id && onDelete(socialMedia._id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

function SocialMediaPage() {
  const {
    user,
    addSocialMedia,
    deleteSocialMedia,
    updateSocialMedia,
    getSocialMedia,
    socialMedia = [],
  } = useProfileStore()
  console.log(socialMedia)

  const router = useRouter()
  const [form, setForm] = useState<SocialMediaForm>({
    platform: 'LinkedIn',
    url: '',
    username: '',
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) router.replace('/private/login')
  }, [user, router])

  useEffect(() => {
    const fetchSocialMedia = async () => {
      setLoading(true)
      await getSocialMedia()
      setLoading(false)
    }
    fetchSocialMedia()
  }, [getSocialMedia])

  if (!addSocialMedia || !updateSocialMedia || !deleteSocialMedia) {
    return <div>Store methods not available.</div>
  }

  const resetForm = () =>
    setForm({
      platform: 'LinkedIn',
      url: '',
      username: '',
    })

  const handleSubmit = async () => {
    if (!form.platform || !form.url) return

    const socialMediaData = {
      ...form,
      // Icon can be derived from the platform name
      icon: form.platform.toLowerCase(),
      // Ensure the username is an empty string if not provided, to avoid 'undefined'
      username: form.username || '',
    }

    if (editingId) {
      await updateSocialMedia(editingId, socialMediaData as SocialMedia)
      setEditingId(null)
    } else {
      await addSocialMedia({ ...socialMediaData } as SocialMedia)
    }
    resetForm()
  }

  const handleEdit = (sm: SocialMedia) => {
    setEditingId(sm._id!)
    setForm({
      _id: sm._id,
      platform: sm.platform,
      url: sm.url,
      username: sm.username || '',
    })
  }

  const handleDelete = async (id: string) => {
    await deleteSocialMedia(id)
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Social Media</h1>

      {/* Form */}
      <Card className="p-4">
        <CardHeader className="p-0 pb-4">
          <CardTitle className="text-lg">{editingId ? 'Update Link' : 'Add New Link'}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 p-0">
          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Select
              value={form.platform}
              onValueChange={(value) => setForm({ ...form, platform: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                <SelectItem value="GitHub">GitHub</SelectItem>
                <SelectItem value="Twitter">Twitter/X</SelectItem>
                <SelectItem value="Website">Website</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">Profile URL</Label>
            <Input
              id="url"
              placeholder="e.g., https://linkedin.com/in/username"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username (optional)</Label>
            <Input
              id="username"
              placeholder="e.g., JohnDoe"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 p-0 pt-4">
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
          <p className="text-sm text-gray-500">Loading social media links...</p>
        ) : socialMedia.length === 0 ? (
          <p className="text-sm text-gray-500">No social media links added yet.</p>
        ) : (
          <div className='flex flex-wrap gap-2'>
            { socialMedia&& socialMedia.length>0&&

              socialMedia.map((sm) => (
                <SocialMediaCard
                  key={sm._id}
                  socialMedia={sm}
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

export default SocialMediaPage
