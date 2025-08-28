'use client'
import { useProfileStore } from '@/store/store'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import CertificationForm from './CertificationForm'
import CertificationList from './CertificationList'
import { Certification } from '@/types/types'


export default function CertificationPage() {
  const { user, certifications = [], addCertification, deleteCertification, updateCertification, getCertifications } =
    useProfileStore()
    

  const router = useRouter()
  const [editingCert, setEditingCert] = useState<Certification | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) router.replace('/private/login')
  }, [user, router])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await getCertifications()
      setLoading(false)
    }
    fetchData()
  }, [getCertifications])

  if(!updateCertification || !deleteCertification || !addCertification || !getCertifications){
    return (
      <div>
        Method not Available
      </div>
    )
  }
  const handleSubmit = async (form: Certification, editingId: string | null) => {
    if(!form)return;
    if (editingId) {
      await updateCertification(editingId, form)
      setEditingCert(null)
    } else {
      await addCertification(form)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Certifications</h1>

      <CertificationForm
        onSubmit={handleSubmit}
        editingCert={editingCert}
        onCancel={() => setEditingCert(null)}
      />

      <CertificationList
        certifications={certifications}
        onEdit={(cert) => setEditingCert(cert)}
        onDelete={(id) => deleteCertification(id)}
        loading={loading}
      />
    </div>
  )
}
