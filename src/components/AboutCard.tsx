'use client';

import React, { useCallback, useEffect, useState, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from './ui/button';
import { usePublicProfileStore } from '@/store/public.store';

gsap.registerPlugin(useGSAP);

const iam = ['Full Stack Developer', 'Android Developer'];

const AboutCard = () => {
    const { user, socialMedia } = usePublicProfileStore();
    const [tech, setTech] = useState<string>('');
    const router = useRouter();

    // 🔁 Animated typing effect
    const handleIam = useCallback(() => {
        let index = 0;

        const loop = () => {
            setTech(iam[index]);
            index = (index + 1) % iam.length;
            setTimeout(loop, 3000);
        };

        loop();
    }, []);

    // ✅ Favicon extractor with fallback
    const getIconUrl = (baseUrl: string): string => {
        try {
            const normalizedUrl = baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`;
            const parsedUrl = new URL(normalizedUrl);
            const domain = parsedUrl.hostname;
            return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
        } catch (error) {
            console.error('Invalid URL:', baseUrl);
            return '/fallback-icon.png'; // Local fallback icon
        }
    };

    // 🔥 GSAP animations
    useGSAP(() => {
        gsap.from('#welcome', {
            x: 100,
            duration: 1.2,
            scale: 1.2,
            ease: 'power3.out',
            opacity: 0,
        });

        gsap.from('.icon-button', {
            y: 20,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'back.out(1.7)',
        });

        gsap.from('.avatar-image', {
            opacity: 0,
            scale: 0.9,
            duration: 1.2,
            ease: 'power2.out',
            delay: 0.3,
        });
    });

    useEffect(() => {
        handleIam();
    }, [handleIam]);

    const renderSocialMediaButtons = useMemo(() => {
        return socialMedia?.map((item) => (
            <Button
                key={item._id}
                className="icon-button p-2 w-10 cursor-pointer h-10 relative"
                onClick={() => window.open(item.url, '_blank')}
            >
                <Image
                    fill
                    src={getIconUrl(item.url)}
                    alt="icon"
                    className="rounded"
                />
            </Button>
        ));
    }, [socialMedia]);

    if (!user) {
        return (
            <div>
                <h1 className="font-bold italic text-2xl">
                    <span>Hi, </span>
                    I am a {tech}
                </h1>
            </div>
        );
    }

    return (
        <div className="flex flex-wrap   bg-[#39393942] rounded-2xl  mx-2 shadow-2xl justify-center items-center w-[96vw] min-h-[95vh] p-6 gap-4">
            {/* Left Column */}
            <button onClick={()=>router.push("/private/login")} className='  absolute bottom-2 transition-all duration-500 right-5 bg-[#39393942] hover:bg-blue-500 rounded-2xl text-gray-800 px-2 py-2   ' >Workbench</button>
            <div className="flex-1 flex  flex-col gap-y-4 flex-wrap">
                <h1 className="font-bold h-10 pl-4 italic text-2xl transition-all duration-1000">
                    <span>Hi, </span>
                    I am a{' '}
                    <span
                        id="welcome"
                        className="transition-all duration-1000 ease-in-out text-blue-500"
                    >
                        {tech}
                    </span>
                </h1>

                <div className="mt-10">
                    <p className="text-sm italic tracking-tight pl-4 pr-10">{user.bio}</p>
                </div>
                <div>

                <Button
                    className="bg-blue-500 hover:bg-blue-700 ml-4 mt-3 w-20 "
                    onClick={() => router.push('/public/contact')}
                >
                    Contact
                </Button>
                <Button
                    className="bg-black-500 border border-gray-800 hover:bg-blue-700 ml-4 mt-3 w-20 "
                    onClick={() => router.push('/public/resume')}
                >
                    Resume
                </Button>
                </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 flex flex-wrap  items-center justify-center ">
                <div className="flex flex-row flex-wrap justify-center items-center gap-4">
                    {/* User Info */}
                    <div>
                        <h1 className="text-xl font-bold">{user.name}</h1>
                        <p className="text-[13px] tracking-wider">{user.email}</p>

                        {/* Social Media Icons */}
                        <div className="flex  gap-2 mt-3 flex-wrap">
                            {renderSocialMediaButtons}
                        </div>
                    </div>

                    {/* Avatar */}
                    <div className="relative h-40 w-40 mt-6 avatar-image">
                        <Image
                            fill
                            src={user.avatarUrl as string}
                            alt="avatar"
                            className=" rounded-2xl object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutCard;
