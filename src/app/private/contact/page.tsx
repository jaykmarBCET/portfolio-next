'use client'
import { useProfileStore } from '@/store/store'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Contact } from '@/types/types'

type ContactForm = {
  _id?: string
  name: string
  email: string
  message: string
  dateSent: string
}

function ContactPage() {
  const { user, contacts = [], addContact, deleteContact, updateContact, getContacts } = useProfileStore()
  const router = useRouter()

  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    message: '',
    dateSent: new Date().toISOString().split('T')[0],
  })
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    if (!user) router.replace('/private/login')
  }, [user, router])

  useEffect(() => {
    getContacts()
  }, [])

  if (!addContact || !updateContact || !deleteContact) {
    return <div>Store methods not available.</div>
  }

  const resetForm = () =>
    setForm({
      name: '',
      email: '',
      message: '',
      dateSent: new Date().toISOString().split('T')[0],
    })

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return

    if (editingId) {
      await updateContact(editingId, { ...form })
      setEditingId(null)
    } else {
      await addContact({ ...form })
    }
    resetForm()
  }

  const handleEdit = (contact: Contact) => {
    setEditingId(contact._id!)
    setForm({
      _id: contact._id,
      name: contact.name,
      email: contact.email,
      message: contact.message,
      dateSent: new Date(contact.dateSent).toISOString().split('T')[0],
    })
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Contacts</h1>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Update Contact' : 'Add Contact'}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Textarea
            placeholder="Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <Input
            type="date"
            value={form.dateSent}
            onChange={(e) => setForm({ ...form, dateSent: e.target.value })}
          />
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
        {contacts.length === 0 && (
          <p className="text-sm text-gray-500">No contacts yet.</p>
        )}
        {contacts.length > 0 &&
          contacts.map((contact) => (
            <Card key={contact._id! || contact.email} className="p-4">
              <CardHeader>
                <CardTitle>{contact.name}</CardTitle>
                <Badge variant="secondary">{contact.email}</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{contact.message}</p>
                <p className="text-xs text-gray-500">
                  Sent on: {new Date(contact.dateSent).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button size="sm" onClick={() => handleEdit(contact)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => contact._id && deleteContact(contact._id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  )
}

export default ContactPage
