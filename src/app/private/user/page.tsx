'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useProfileStore } from '@/store/store'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { User } from '@/types/types'



function UserPage() {
  const { user, updateUser, getUser } = useProfileStore()
  const router = useRouter()
  const [formData, setFormData] = useState<User>({
    name: '',
    email: '',
    avatarUrl: '',
    bio: '',
    password: '',
  })
  const [loading, setLoading] = useState(true)

  // Use this effect to redirect if the user is not authenticated
  useEffect(() => {
    if (!user) {
      router.replace('/private/login')
    }
  }, [user, router])

  // Use this effect to fetch the user data and populate the form
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      await getUser()
      setLoading(false)
    }
    fetchUser()
  }, [getUser])

  // Use this effect to set the form data when the user object is available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        avatarUrl: user.avatarUrl || '',
        bio: user.bio || '',
        // We do not pre-fill the password field for security reasons
        password: '',
      })
    }
  }, [user])

  // Check if the updateUser method is available from the store
  if (!updateUser) {
    return <div>Store methods not available.</div>
  }

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = async () => {
    // Note: A real-world app would have more robust validation
    if (!formData.name || !formData.email) {
      alert('Name and email are required.')
      return
    }

    try {
      // Create a payload that only includes the password if it's been entered
      const updatePayload= {
        name: formData.name,
        email: formData.email,
        avatarUrl: formData.avatarUrl,
        bio: formData.bio,
        password:formData.password
      };

      if (formData.password) {
        updatePayload.password = formData.password;
      }

      await updateUser(updatePayload)
      
      // Clear the password field after a successful update
      setFormData((prevData) => ({ ...prevData, password: '' }));
    } catch (error) {
      console.error('Failed to update user:', error)
      alert('Failed to update profile. Please try again.')
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Your Profile</h1>
      
      {/* Show a loading state while fetching data */}
      {loading ? (
        <p className="text-sm text-gray-500">Loading profile...</p>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                value={formData.password || ''}
                onChange={handleInputChange}
                placeholder="Enter a new password"
                type="password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatarUrl">Avatar URL</Label>
              <Input
                id="avatarUrl"
                value={formData.avatarUrl || ''}
                onChange={handleInputChange}
                placeholder="Enter a URL for your avatar"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio || ''}
                onChange={handleInputChange}
                placeholder="Tell us a bit about yourself"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit}>Update Profile</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

export default UserPage
