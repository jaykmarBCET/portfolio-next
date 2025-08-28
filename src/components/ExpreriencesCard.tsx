"use client";
import { usePublicProfileStore } from '@/store/public.store';
import React from 'react';
import { Briefcase } from "lucide-react";

function ExperienceCard() {
  const { user, experiences } = usePublicProfileStore();

  if (!experiences || experiences.length === 0 || !user) {
    return <div></div>
  }

  return (
    <div className="mt-4 px-4 sm:px-8 py-8 bg-[#39393934] w-[96vw] min-h-[24rem] shadow-lg rounded-2xl">
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold italic tracking-wide mb-8">
        Experiences
      </h1>

      <div className="flex flex-col gap-6">
        {experiences.map((item) => (
          <div
            key={item._id}
            className="bg-white/5 border border-white/10 p-5 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-2">
              <Briefcase className="text-blue-400 w-5 h-5" />
              <h2 className="text-lg font-bold italic">{item.company}</h2>
            </div>

            <p className="text-sm text-gray-300 mb-2">
              <span className="font-semibold">Position:</span> {item.position}
            </p>

            <p className="text-xs text-gray-400">
              {item.startDate?.substring(0, 10)} →{" "}
              {item?.endDate ? item.endDate.substring(0, 10) : "Present"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExperienceCard;
