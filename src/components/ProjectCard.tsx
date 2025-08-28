import { usePublicProfileStore } from '@/store/public.store'
import React from 'react'
import { ProjectCarousel } from "./ui/card-carousel";

function ProjectCard() {
    const { projects, user } = usePublicProfileStore()

    if (!projects || !user) {
        return (
            <div></div>
        )
    }
    return (
        <div className='mt-4 overflow-x-hidden bg-[#39393934] mx-10 w-[96vw] shadow rounded-2xl min-h-96 '>
            <h1 className='text-center text-3xl mt-3 italic font-extrabold tracking-wide'>Projects</h1>

            <div className=" mhi-h-96">
                <ProjectCarousel projects={projects} autoplayDelay={2000} showNavigation={false} showPagination={false}/>
            </div>
        </div>
    )
}

export default ProjectCard

