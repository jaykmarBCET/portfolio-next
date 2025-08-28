'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Certification } from '@/types/types'

type CertForm = {
  _id?: string
  title: string
  issuer: string
  dateIssued: string
  credentialUrl?: string
}

interface CertificationFormProps {
  onSubmit: (form: CertForm, editingId: string | null) => Promise<void>
  editingCert?: Certification | null
  onCancel: () => void
}

export default function CertificationForm({ onSubmit, editingCert, onCancel }: CertificationFormProps) {
  const [form, setForm] = useState<CertForm>({
    title: '',
    issuer: '',
    dateIssued: '',
    credentialUrl: '',
  })

  // 🔥 FIX: Update form state whenever editingCert changes
  useEffect(() => {
    if (editingCert) {
      setForm({
        _id: editingCert._id,
        title: editingCert.title,
        issuer: editingCert.issuer,
        dateIssued: editingCert.dateIssued
          ? new Date(editingCert.dateIssued).toISOString().split('T')[0]
          : '',
        credentialUrl: editingCert.credentialUrl || '',
      })
    } else {
      setForm({ title: '', issuer: '', dateIssued: '', credentialUrl: '' })
    }
  }, [editingCert])

  const handleSubmit = async () => {
    if (!form.title || !form.issuer || !form.dateIssued) return
    await onSubmit(form, form._id || null)
    setForm({ title: '', issuer: '', dateIssued: '', credentialUrl: '' })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{form._id ? 'Update Certification' : 'Add Certification'}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Input
          placeholder="Issuer"
          value={form.issuer}
          onChange={(e) => setForm({ ...form, issuer: e.target.value })}
        />
        <Input
          type="date"
          value={form.dateIssued}
          onChange={(e) => setForm({ ...form, dateIssued: e.target.value })}
        />
        <Input
          placeholder="Credential URL"
          value={form.credentialUrl}
          onChange={(e) => setForm({ ...form, credentialUrl: e.target.value })}
        />
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit}>{form._id ? 'Update' : 'Add'}</Button>
        {form._id && (
          <Button variant="outline" className="ml-2" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
