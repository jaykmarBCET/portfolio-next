import { usePublicProfileStore } from '@/store/public.store'

import React from 'react'
import { Badge } from './ui/badge'
import Image from 'next/image';

const getIconUrl = (baseUrl: string): string => {
    try {
        const normalizedUrl = baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`;
        const parsedUrl = new URL(normalizedUrl);
        const domain = parsedUrl.hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch (error) {
        console.log(error)
        return '/fallback-icon.png'; // Local fallback icon
    }
};


function InterestLanguageCard() {
    const { user, languages, interests, socialMedia } = usePublicProfileStore()

    if (!user || !languages || !interests || !socialMedia) {
        return (
            <div></div>
        )
    }
    return (
        <div className="mt-4 px-4 flex flex-wrap gap-2  sm:px-8 py-10 bg-[#39393934] w-[96vw] shadow rounded-2xl">
            <div className='flex-1 min-w-72 border border-gray-800 py-2 rounded-xl'>
                <h1 className="text-center text-2xl  font-extrabold italic tracking-wide mb-10 text-gray-800 dark:text-gray-100">
                    Language
                </h1>
                <div className='flex flex-wrap  gap-2 justify-center items-center'>
                    {
                        languages.map((item) => (
                            <div className='border border-gray-700 rounded-2xl flex flex-col w-24 justify-center items-center' key={item._id}>
                                <h1 className='font-bold italic text-[15px]'>{item.name}</h1>
                                <Badge className='text-[10px] italic' >{item.fluency}</Badge>
                            </div>
                        ))
                    }
                </div>

            </div>
            <div className='flex-1 min-w-72 border border-gray-800 rounded-xl py-2'>
                <h1 className="text-center text-2xl font-extrabold italic tracking-wide mb-10 text-gray-800 dark:text-gray-100">
                    Interest
                </h1>
                <div className='flex justify-center items-center flex-wrap gap-2'>
                    {
                        interests.map((item) => (
                            <div className='border px-1 border-gray-700 rounded-2xl flex flex-col w-32 justify-center items-center' key={item._id}>
                                <h1 className='text-[15px] italic font-bold'>{item.name}</h1>
                                <p className='text-[12px] py-2 italic'>{item.description}</p>
                            </div>
                        ))
                    }
                </div>

            </div>
            <div className='flex-1 rounded-2xl min-w-72 border border-gray-800 py-2'>
                <h1 className="text-center text-2xl  font-extrabold italic tracking-wide mb-10 text-gray-800 dark:text-gray-100">
                    Social Media
                </h1>
                <div className='flex flex-wrap gap-2 justify-center items-center'>
                    {
                        socialMedia.map((item) => (
                            <div onClick={()=>window.location.href=item.url} className='flex cursor-pointer flex-col w-30 border border-gray-800 rounded-md px-2 py-1' key={item._id}>

                                <div className='flex gap-2 items-center'>
                                    <div className='relative w-8 h-8'>
                                        <Image fill src={getIconUrl(item.url)} alt='' />
                                    </div>
                                    <div>
                                        <p className='text-[15px] bold italic'>{item.username}</p>
                                        <p className='text-[12px]'>{item.platform}</p>
                                    </div>
                                </div>
                                
                            </div>
                        ))
                    }
                </div>
            </div>


        </div >
    )
}

export default InterestLanguageCard