'use client'
import { Certification } from '@/types/types'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import CertificateEmbed from '@/components/CertificateEmbed'

interface CertificationListProps {
  certifications: Certification[]
  onEdit: (cert: Certification) => void
  onDelete: (id: string) => void
  loading: boolean
}

export default function CertificationList({ certifications, onEdit, onDelete, loading }: CertificationListProps) {
  if (loading) return <p className="text-sm text-gray-500">Loading certifications...</p>
  if (certifications.length === 0) return <p className="text-sm text-gray-500">No certifications yet.</p>

  return (
    <div className="grid gap-4">
      {certifications && certifications.map((cert) => (
        <Card key={cert._id ?? cert.title} className="p-4">
          <CardHeader>
            <CardTitle>{cert.title}</CardTitle>
            <Badge variant="secondary">{cert.issuer}</Badge>
          </CardHeader>
          <CardContent>
            {cert.dateIssued && (
              <p className="text-sm">Issued on: {new Date(cert.dateIssued).toLocaleDateString()}</p>
            )}
            {cert.credentialUrl && (
              <div>
                <div className="flex items-center min-h-96 justify-center">

                  <CertificateEmbed embedUrl={cert.credentialUrl}  />

                </div>


              </div>
            )}
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button size="sm" onClick={() => onEdit(cert)}>
              Edit
            </Button>
            <Button size="sm" variant="destructive" onClick={() => cert._id && onDelete(cert._id)}>
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
