import { usePublicProfileStore } from '@/store/public.store';
import React from 'react';

function EducationCard() {
    const { educationList } = usePublicProfileStore();

    if (!educationList?.length) return null;

    const education = educationList[0]; // Show first education

    return (
        <div className="bg-[#171f33] p-6 rounded-xl">
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-[#98cbff]/60 mb-4">Academic Foundation</h2>
            <div className="mb-4">
                <div className="text-lg font-bold text-[#dae2fd]">{education.degree} {education.fieldOfStudy}</div>
                <div className="text-sm text-[#bec7d4]">{education.institution}</div>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#bec7d4]">
                <span className="material-symbols-outlined text-sm">calendar_today</span>
                <span>Class of {education.endDate ? new Date(education.endDate).getFullYear() : 'Present'}</span>
            </div>
        </div>
    );
}

export default EducationCard;
