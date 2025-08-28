"use client"

import React from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Project } from "@/types/types"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { ExternalLink, Github, PanelBottomOpen } from "lucide-react"


import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules"




import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { DevIcons } from "@/constants/SkiilsIcons"
import { useRouter } from "next/navigation"

interface CarouselProps {
  projects: Project[]
  autoplayDelay?: number
  showPagination?: boolean
  showNavigation?: boolean
}

export const ProjectCarousel: React.FC<CarouselProps> = ({
  projects,
  autoplayDelay = 1500,
  showPagination = true,
  showNavigation = true,
}) => {
  const css = `
  .swiper {
    width: 100%;
    padding-bottom: 50px;
  }
  
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    /* height: 300px; */
    /* margin: 20px; */
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
  }
  
  
  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
  .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }
  `
  return (
    <section className="w-ace-y-8 mt-10">
      <style>{css}</style>
      <div className="mx-auto w-full max-w-4xl rounded-[24px] border border-black/5 p-2 shadow-sm md:rounded-t-[44px]">
        <div className="relative mx-auto flex w-full flex-col rounded-[24px] border border-black/5 bg-neutral-800/5 p-2 shadow-sm md:items-start md:gap-8 md:rounded-b-[20px] md:rounded-t-[40px] md:p-2">
          <div className="flex w-full items-center justify-center gap-4">
            <div className="w-full">
              <Swiper
                spaceBetween={50}
                autoplay={{
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                }}
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                }}
                pagination={showPagination}
                navigation={
                  showNavigation
                    ? {
                      nextEl: ".swiper-button-next",
                      prevEl: ".swiper-button-prev",
                    }
                    : undefined
                }
                modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
              >
                {projects.map((project, index) => (
                  <SwiperSlide key={index}>
                    <div className="size-full rounded-3xl">
                      <CardRender projectId={project._id} technologies={project.technologies} title={project.title} description={project.description} demoLink={project.liveUrl as string} codeLink={project.githubUrl as string} image={project.imageUrl as string} />
                    </div>
                  </SwiperSlide>
                ))}
                {projects.map((project, index) => (
                  <SwiperSlide key={index}>
                    <div className="size-full rounded-3xl">
                      <CardRender projectId={project._id} technologies={project.technologies} title={project.title} description={project.description} demoLink={project.liveUrl as string} codeLink={project.githubUrl as string} image={project.imageUrl as string} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

type ProjectProps = {
  title: string;
  description: string;
  image: string;
  demoLink: string;
  codeLink: string;
  technologies: string[]
  projectId?:string
}

function CardRender({ title,projectId, description, image, demoLink, codeLink, technologies }: ProjectProps) {
  const router = useRouter()
  return (
    <Card className="rounded-2xl w-full bg-white text-black max-w-sm sm:max-w-md md:max-w-lg shadow-lg hover:scale-[1.02] transition-transform">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className=" relative">
        {
          <Image
            src={image}
            alt={title}

            width={600}
            height={300}
            className="w-full h-auto rounded-xl mb-3 object-cover"
          />
        }
        <Badge className="font-bold italic tracking-wider" variant="secondary">Technologies</Badge>
        <div className="flex flex-wrap gap-2">
          {
            technologies.map((name, idx) => (
              <Badge className="flex w-14 rounded-xl p-1 justify-center items-center flex-col border" key={idx}>

                <i style={{ fontSize: 15 }} className={`${DevIcons[name.toLowerCase()]} colored`}></i>
                <p className="text-[10px]">

                  {!DevIcons[name] ? name : ""
                  }
                </p>
              </Badge>
            ))
          }
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-3">
        <Button asChild  className="flex-1 border border-gray-300 min-w-[120px]">
          <a href={demoLink} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" /> Demo
          </a>
        </Button>
        <Button asChild className="flex-1 border border-gray-300 min-w-[120px]">
          <a href={codeLink} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" /> Code
          </a>
        </Button>
        <Button onClick={()=>router.push(`/public/project/${projectId}`)} asChild className="flex-1 border border-gray-300 min-w-[120px] cursor-pointer">
          <div>
            <PanelBottomOpen className="mr-2 h-4 w-4" />
            <p>More</p>

          </div>
        </Button>
      </CardFooter>
    </Card>
  );
}
