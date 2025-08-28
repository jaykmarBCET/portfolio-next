import { usePublicProfileStore } from '@/store/public.store';
import { Badge } from '@/components/ui/badge';
import React from 'react';

function EducationCard() {
    const { user, educationList } = usePublicProfileStore();

    if (!educationList || !user) {
        return <div></div>;
    }

    return (
        <div className="mt-6 px-4 sm:px-8  py-6 bg-[#39393934] w-[96vw]   shadow rounded-2xl">
            <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold italic tracking-wide mb-6">
                Education
            </h1>

            <div className="flex flex-col gap-6">
                {educationList.map((item) => {
                    const startDate = item.startDate ? new Date(item.startDate) : null;
                    const endDate = item.endDate ? new Date(item.endDate) : null;

                    return (
                        <div
                            key={item._id}
                            className="bg-white/10 p-4 hover:scale-y-105 duration-300  rounded-xl shadow-sm hover:shadow-md transition-all"
                        >
                            <h2 className="text-lg sm:text-xl font-semibold">{item.institution}</h2>

                            <div className="flex flex-wrap items-center gap-2 mt-2">
                                <Badge variant="default">{item.degree}</Badge>
                                <p className="text-sm text-gray-300">{item.fieldOfStudy}</p>
                            </div>

                            <div className="mt-2 text-sm text-gray-400">
                                <p>
                                    {startDate?.toLocaleDateString(undefined, {
                                        month: 'short',
                                        year: 'numeric',
                                    })}{' '}
                                    -{' '}
                                    {endDate
                                        ? endDate.toLocaleDateString(undefined, {
                                              month: 'short',
                                              year: 'numeric',
                                          })
                                        : 'Present'}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default EducationCard;
