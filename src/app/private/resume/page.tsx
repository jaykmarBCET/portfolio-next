'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useProfileStore } from '@/store/store'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Resume } from '@/types/types'
import { FaFilePdf, FaFileImage } from 'react-icons/fa'




// Type for the form data
type ResumeForm = {
  _id?: string
  fileUrl: string
  fileName: string
  fileType: string | 'PDF' | 'Image'
  isAndroid: boolean
  isIOS: boolean
  isMac: boolean
  isWeb: boolean
  isServer: boolean
  isWindows: boolean
}

// Separate component for a single resume card
const ResumeCard = ({ resume, onEdit, onDelete }: {
  resume: Resume
  onEdit: (resume: Resume) => void
  onDelete: (id: string) => void
}) => {
  const getFileIcon = (fileType?: string) => {
    switch (fileType) {
      case 'PDF':
        return <FaFilePdf className="h-6 w-6 text-red-500" />
      case 'Image':
        return <FaFileImage className="h-6 w-6 text-blue-500" />
      default:
        return <FaFileImage className="h-6 w-6 text-gray-500" />
    }
  }

  return (
    <Card className="p-4 flex flex-col lg:flex-row gap-4 items-start">
      {/* Left Section - Info */}
      <div className="flex-1 flex items-start gap-3">
        {getFileIcon(resume.fileType)}
        <div>
          <CardTitle className="text-base font-semibold">{resume.fileName || 'Untitled Resume'}</CardTitle>
          <p className="text-sm text-muted-foreground">
            Uploaded: {new Date(resume.uploadedAt).toLocaleDateString()}
          </p>
          <a
            href={resume.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            View Full File
          </a>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {resume.isWeb && <span className="rounded-full bg-slate-800 px-2 py-1 text-xs font-medium text-slate-200">Web</span>}
            {resume.isAndroid && <span className="rounded-full bg-slate-800 px-2 py-1 text-xs font-medium text-slate-200">Android</span>}
            {resume.isIOS && <span className="rounded-full bg-slate-800 px-2 py-1 text-xs font-medium text-slate-200">iOS</span>}
            {resume.isMac && <span className="rounded-full bg-slate-800 px-2 py-1 text-xs font-medium text-slate-200">macOS</span>}
            {resume.isServer && <span className="rounded-full bg-slate-800 px-2 py-1 text-xs font-medium text-slate-200">Server</span>}
            {resume.isWindows && <span className="rounded-full bg-slate-800 px-2 py-1 text-xs font-medium text-slate-200">Windows</span>}
          </div>
          <div className="mt-3 flex gap-2">
            <Button size="sm" onClick={() => onEdit(resume)}>
              Edit
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => resume._id && onDelete(resume._id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Right Section - PDF Preview */}
      {resume.fileType === 'PDF' && (
        <div className="w-full lg:w-1/2 border rounded-md shadow-sm overflow-hidden">
          <iframe
            src={resume.fileUrl}
            className="w-full h-96"
            title="PDF Preview"
          />
        </div>
      )}
    </Card>
  )
}


function ResumePage() {
  const {
    user,
    resumes = [],
    addResume,
    deleteResume,
    updateResume,
    getResumes,
  } = useProfileStore()

  const router = useRouter()
  const [form, setForm] = useState<ResumeForm>({
    fileUrl: '',
    fileName: '',
    fileType: 'PDF',
    isAndroid: false,
    isIOS: false,
    isMac: false,
    isWeb: false,
    isServer: false,
    isWindows: false,
  })
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    if (!user) router.replace('/private/login')
  }, [user, router])

  useEffect(() => {
    const fetchResumes = async () => {
      setLoading(true)
      await getResumes()
      setLoading(false)
    }
    fetchResumes()
  }, [getResumes])

  if (!addResume || !updateResume || !deleteResume) {
    return <div>Store methods not available.</div>
  }

  const resetForm = () => {
    setForm({
      fileUrl: '',
      fileName: '',
      fileType: 'PDF',
      isAndroid: false,
      isIOS: false,
      isMac: false,
      isWeb: false,
      isServer: false,
      isWindows: false,
    })
  }

  const handleSubmit = async () => {
    if (!form.fileUrl || !form.fileName || !form.fileType) {
      alert('Please fill in all fields.')
      return
    }

    const resumeData = {
      ...form,
      uploadedAt: new Date(),
      isAndroid: form.isAndroid,
      isIOS: form.isIOS,
      isMac: form.isMac,
      isWeb: form.isWeb,
      isServer: form.isServer,
      isWindows: form.isWindows,
    }

    if (editingId) {
      await updateResume(editingId, resumeData as Resume)
      setEditingId(null)
    } else {
      await addResume({ ...resumeData } as Resume)
    }
    resetForm()
  }

  const handleEdit = (resume: Resume) => {
    setEditingId(resume._id!)
    setForm({
      _id: resume._id,
      fileUrl: resume.fileUrl,
      fileName: resume.fileName || '',
      fileType: resume.fileType as string,
      isAndroid: resume.isAndroid || false,
      isIOS: resume.isIOS || false,
      isMac: resume.isMac || false,
      isWeb: resume.isWeb || false,
      isServer: resume.isServer || false,
      isWindows: resume.isWindows || false,
    })
  }

  const handleDelete = async (id: string) => {
    await deleteResume(id)
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Resumes</h1>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Update Resume' : 'Add New Resume'}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="fileUrl">File URL</Label>
            <Input
              id="fileUrl"
              placeholder="e.g., https://example.com/my-resume.pdf"
              value={form.fileUrl}
              onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fileName">File Name</Label>
            <Input
              id="fileName"
              placeholder="e.g., My Professional Resume"
              value={form.fileName}
              onChange={(e) => setForm({ ...form, fileName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fileType">File Type</Label>
            <Select
              value={form.fileType}
              onValueChange={(value: 'PDF' | 'Image') => setForm({ ...form, fileType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select file type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PDF">PDF</SelectItem>
                <SelectItem value="Image">Image</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Web', field: 'isWeb' },
              { label: 'Android', field: 'isAndroid' },
              { label: 'iOS', field: 'isIOS' },
              { label: 'macOS', field: 'isMac' },
              { label: 'Server', field: 'isServer' },
              { label: 'Windows', field: 'isWindows' },
            ].map(({ label, field }) => (
              <label key={field} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form[field as keyof ResumeForm] as boolean}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      [field]: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                {label}
              </label>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit}>
            {editingId ? 'Update' : 'Add'}
          </Button>
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
          <p className="text-sm text-gray-500">Loading resumes...</p>
        ) : resumes.length === 0 ? (
          <p className="text-sm text-gray-500">No resumes added yet.</p>
        ) : (
          <div className='flex flex-wrap gap-2'>
            {resumes && resumes.length > 0 &&

              resumes.map((resume) => (
                <ResumeCard
                  key={resume._id}
                  resume={resume}
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

export default ResumePage