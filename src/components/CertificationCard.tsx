import { usePublicProfileStore } from '@/store/public.store'
import React from 'react'
import CertificateEmbed from './CertificateEmbed'

function CertificationCard() {
  const { user, certifications } = usePublicProfileStore()

  if (!user || !certifications) {
    return <div></div>
  }

  return (
    <div className="mt-4 px-4 sm:px-8 py-10 bg-[#39393934] w-[96vw] shadow rounded-2xl">
      <h1 className="text-center text-3xl md:text-4xl font-extrabold italic tracking-wide mb-10 text-gray-800 dark:text-gray-100">
        Certificates
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((item) => (
          <div
            key={item._id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 hover:scale-[1.02] p-4 flex flex-col items-center"
          >
            {/* Certificate Title */}
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1 text-center">
              {item.title}
            </h2>

            {/* Issuer + Date */}
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {item.issuer} • {new Date(item.dateIssued).toLocaleDateString()}
            </p>

            {/* Certificate Iframe */}
            <div className="relative w-full mt-4 rounded-lg overflow-hidden aspect-[4/3] border">
              <CertificateEmbed embedUrl={item.credentialUrl} />
            </div>

            {/* View Button */}
            <a
              href={item.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
            >
              View Full Certificate →
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CertificationCard
