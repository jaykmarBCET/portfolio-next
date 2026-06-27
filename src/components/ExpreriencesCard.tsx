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
    <div className="space-y-10 border-l border-[#3f4852]/20 ml-3 pl-8 relative">
      {experiences.slice(0, 3).map((experience, index) => (
        <div key={experience._id} className="relative">
          <div className={`absolute -left-[41px] top-1.5 w-4 h-4 rounded-full shadow-[0_0_15px_#2fd9f4] border-4 border-[#0b1326] ${
            index === 0 ? 'bg-[#2fd9f4]' : 'bg-[#2d3449]'
          }`}></div>
          <div className="text-xs font-bold text-[#2fd9f4] uppercase tracking-widest mb-1">
            {experience.startDate ? new Date(experience.startDate).getFullYear() : '2022'} — {
              experience.endDate ? new Date(experience.endDate).getFullYear() : 'Present'
            }
          </div>
          <h3 className="text-lg font-bold text-[#dae2fd]">{experience.position}</h3>
          <div className="text-[#98cbff] font-medium text-sm mb-3">{experience.company}</div>
          <p className="text-sm text-[#bec7d4] leading-relaxed">{experience.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ExperienceCard;
