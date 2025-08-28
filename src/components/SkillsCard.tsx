'use client'

import React, { useRef } from 'react'
import { Badge } from './ui/badge'
import { usePublicProfileStore } from '@/store/public.store'

function SkillsCard() {
  const { skills } = usePublicProfileStore();
  const cardRef = useRef<HTMLDivElement>(null);

  
  if (!skills?.length) return null;

  return (
    <div
      ref={cardRef}
      className="bg-[#39393942] mt-4 mx-10 pb-6 w-[96vw] shadow rounded-2xl min-h-96"
    >
      <h1 className="font-extrabold text-3xl tracking-wide italic text-center mt-3">
        Skills
      </h1>

      <div
        className="flex px-4 flex-wrap gap-6 mt-10 justify-center items-center"
      >
        {skills.map((item) => (
          <div
            key={item._id}
            className={`
              skill-item
              w-30 h-30
              flex justify-center items-center flex-col
              transition-all duration-300 ease-in-out
              transform hover:scale-110
              hover:text-black hover:bg-white hover:rounded-full
              hover:shadow-lg
              cursor-pointer
            `}
          >
            <i className={`${item.iconName} colored`} style={{ fontSize: 40 }}></i>
            <p className="text-[12px] italic tracking-tighter">{item.name}</p>
            <Badge>{item.level}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsCard;