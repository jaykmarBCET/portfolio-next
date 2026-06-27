"use client";
import React, { useEffect } from 'react';
import { usePublicProfileStore } from '@/store/public.store';

function ExperienceCard() {
  const { experiences, getExperiences } = usePublicProfileStore();

  useEffect(() => {
    if ((!experiences || experiences.length === 0) && typeof getExperiences === 'function') {
      getExperiences().catch((e) => console.error('Failed to load experiences:', e))
    }
  }, [experiences, getExperiences])

  if (!experiences || experiences.length === 0) {
    return (
      <div className="rounded-md border border-white/6 bg-[#071025]/60 p-4 text-sm text-[#bfc9df]">No professional experience added yet.</div>
    )
  }

  return (
    <div className="grid gap-4">
      {experiences.map((experience) => (
        <div key={experience._id} className="rounded-3xl border border-white/10 bg-[#0f1724]/80 p-5 shadow-sm shadow-[#001426]/60">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <div className="text-xs font-bold text-[#2fd9f4] uppercase tracking-widest">
                {experience.startDate ? new Date(experience.startDate).getFullYear() : '2022'} — {experience.endDate ? new Date(experience.endDate).getFullYear() : 'Present'}
              </div>
              <h3 className="text-lg font-bold text-[#dae2fd]">{experience.position}</h3>
              <div className="text-[#98cbff] font-medium text-sm">{experience.company}</div>
            </div>
            <div className="text-sm rounded-full border border-[#2fd9f4]/10 bg-[#08131f]/80 px-3 py-2 text-[#bfc9df] w-full sm:w-auto">
              {experience.location || 'Remote / Hybrid'}
            </div>
          </div>
          <p className="mt-4 text-sm text-[#bec7d4] leading-relaxed">{experience.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ExperienceCard;
