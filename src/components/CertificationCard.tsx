import { usePublicProfileStore } from '@/store/public.store'
import React from 'react'

function CertificationCard() {
  const { certifications } = usePublicProfileStore()

  if (!certifications?.length) return null;

  return (
    <div className="bg-[#171f33] p-6 rounded-xl">
        <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-[#98cbff]/60 mb-4">Certifications</h2>
        <div className="flex flex-wrap gap-2">
            {certifications.slice(0, 2).map((cert) => (
                <div key={cert._id} className="bg-[#2d3449] px-4 py-3 rounded-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#2fd9f4] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    <span className="text-xs font-bold uppercase tracking-tight text-[#dae2fd]">{cert.title}</span>
                </div>
            ))}
        </div>
    </div>
  );
}

export default CertificationCard;
