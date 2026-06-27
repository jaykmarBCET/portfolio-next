import { usePublicProfileStore } from '@/store/public.store'
import React, { useMemo, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

function ProjectCard() {
    const { projects } = usePublicProfileStore()
    const carouselRef = useRef<HTMLDivElement>(null)
    const displayProjects = useMemo(() => projects?.slice(0, 6) ?? [], [projects])

    if (!projects?.length) return null

    const scroll = (direction: 'left' | 'right') => {
        if (!carouselRef.current) return
        const distance = carouselRef.current.clientWidth * 0.85
        carouselRef.current.scrollBy({ left: direction === 'left' ? -distance : distance, behavior: 'smooth' })
    }

    return (
        <div className="group relative">
            <div className="relative">
                <div ref={carouselRef} className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide px-6 gap-6 py-4 transition duration-500 ease-out">
                    {displayProjects.map((project) => (
                        <div key={project._id} className="min-w-[320px] sm:min-w-[360px] snap-center shrink-0">
                            <div className="bg-[#222a3d] rounded-[1.75rem] overflow-hidden shadow-[0_20px_60px_-30px_rgba(45,58,93,0.8)] transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_-30px_rgba(45,58,93,0.9)]">
                                <div className="aspect-[16/10] relative overflow-hidden">
                                    <Image
                                        src={project.imageUrl || 'https://via.placeholder.com/400x250'}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b111f]/80 via-transparent to-transparent" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 text-[#dae2fd]">{project.title}</h3>
                                    <p className="text-sm text-[#bec7d4] mb-4 line-clamp-3 min-h-[4.5rem]">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.technologies?.slice(0, 3).map((tech, index) => (
                                            <span
                                                key={index}
                                                className="text-[10px] bg-[#2d3449] px-2 py-1 rounded-full text-[#bec7d4] font-bold uppercase tracking-widest"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-3">
                                            {project.githubUrl && (
                                                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="rounded-2xl p-3 bg-[#111827] hover:bg-[#0f1724] transition">
                                                    <span className="material-symbols-outlined text-[#98cbff]">code</span>
                                                </Link>
                                            )}
                                            {project.liveUrl && (
                                                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="rounded-2xl p-3 bg-[#111827] hover:bg-[#0f1724] transition">
                                                    <span className="material-symbols-outlined text-[#2fd9f4]">arrow_outward</span>
                                                </Link>
                                            )}
                                        </div>
                                        <span className="text-xs uppercase tracking-[0.2em] text-[#98cbff]/70">Project</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => scroll('left')}
                    className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[#070b16]/90 p-3 text-[#98cbff] shadow-lg shadow-[#00000040] transition hover:bg-[#0f1724]"
                >
                    <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button
                    type="button"
                    onClick={() => scroll('right')}
                    className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[#070b16]/90 p-3 text-[#98cbff] shadow-lg shadow-[#00000040] transition hover:bg-[#0f1724]"
                >
                    <span className="material-symbols-outlined">chevron_right</span>
                </button>
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#070b16] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#070b16] to-transparent" />
        </div>
    )
}

export default ProjectCard

