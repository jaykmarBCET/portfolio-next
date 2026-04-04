import { usePublicProfileStore } from '@/store/public.store'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function ProjectCard() {
    const { projects } = usePublicProfileStore()

    if (!projects?.length) return null

    // Get first few projects for horizontal scroll (like the design)
    const displayProjects = projects.slice(0, 6)

    return (
        <div className="flex overflow-x-auto px-6 gap-6 no-scrollbar snap-x">
            {displayProjects.map((project) => (
                <div key={project._id} className="min-w-[280px] snap-center">
                    <div className="bg-[#222a3d] rounded-xl overflow-hidden group">
                        <div className="aspect-video relative overflow-hidden">
                            <Image
                                src={project.imageUrl || "https://via.placeholder.com/400x225"}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#222a3d] via-transparent to-transparent"></div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-lg font-bold mb-2 text-[#dae2fd]">{project.title}</h3>
                            <p className="text-sm text-[#bec7d4] mb-4 line-clamp-2">{project.description}</p>
                            <div className="flex gap-2 mb-6 flex-wrap">
                                {project.technologies?.slice(0, 2).map((tech, index) => (
                                    <span
                                        key={index}
                                        className="text-[10px] bg-[#2d3449] px-2 py-1 rounded text-[#bec7d4] font-bold uppercase tracking-wider"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <div className="flex justify-between items-center">
                                {project.githubUrl && (
                                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                        <span className="material-symbols-outlined text-[#bec7d4] hover:text-[#2fd9f4] transition-colors cursor-pointer">code</span>
                                    </Link>
                                )}
                                {project.liveUrl && (
                                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                        <span className="material-symbols-outlined text-[#2fd9f4] hover:text-[#98cbff] transition-colors cursor-pointer">arrow_outward</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProjectCard

