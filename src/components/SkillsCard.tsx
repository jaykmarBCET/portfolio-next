'use client'
import { usePublicProfileStore } from '@/store/public.store'
import React, { useEffect, useRef } from 'react'
import { Badge } from './ui/badge'
import gsap from 'gsap'

const getLevel = (level: "Beginner" | "Intermediate" | "Advanced" | "Expert") => {
  switch (level) {
    case "Beginner":
      return "border-r-4 border-green-500 rounded-full transition-all duration-500 hover:scale-110 hover:shadow-lg";
    case "Intermediate":
      return "border-r-4 border-b-4 border-blue-500 rounded-full transition-all duration-500 hover:scale-110 hover:rotate-6 hover:shadow-lg";
    case "Advanced":
      return "border-r-4 border-b-4 border-l-4 border-yellow-500 rounded-full transition-all duration-700 hover:scale-110 hover:shadow-xl hover:rotate-12";
    case "Expert":
      return "border-4 border-red-500 rounded-full transition-all duration-700 hover:scale-125 hover:shadow-2xl hover:rotate-180";
    default:
      return "border rounded-full";
  }
};

function SkillsCard() {
  const { skills } = usePublicProfileStore()
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      const items = cardRef.current.querySelectorAll(".skill-item")

      // First: staggered entry animation
      gsap.fromTo(
        items,
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          onComplete: () => {
            // Second: after all rendered, bounce the whole card
            gsap.to(cardRef.current, {
              scale: 1.01,
              rotate: 0,
              duration: 0.6,
              ease: "elastic.out(1, 0.5)",
              yoyo: true,
              repeat: 1,
            })

            // Third: subtle glowing pulse on items
            gsap.to(items, {
              boxShadow: "0px 0px 15px #99999945",
              duration: 1,
              repeat: -1,
              yoyo: true,
              stagger: 0.05,
              ease: "sine.inOut",
              delay: 0.2
            })
          }
        }
      )
    }
  }, [skills])

  if(!skills || skills.length <=0){
    return (
      <div></div>
    )
  }

  return (
    <div className=' bg-[#39393942] mt-4 mx-10 pb-6 w-[96vw] shadow rounded-2xl min-h-96' ref={cardRef}>
      <h1 className='font-extrabold text-3xl tracking-wide italic mx-auto text-center mt-3'>Skills</h1>
      <div className='flex px-4 flex-wrap gap-3 mt-10 justify-center items-center'>
        {skills && skills.length > 0 &&
          skills.map((item) => (
            <div
              className={`skill-item hover:scale-105 flex w-30 h-30 justify-center items-center flex-col ${getLevel(item.level)}`}
              key={item._id}
            >
              <i style={{ fontSize: 40 }} className={`${item.iconName} colored`} ></i>
              <p className='text-[12px] italic tracking-tighter'>{item.name}</p>
              <Badge>{item.level}</Badge>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default SkillsCard
