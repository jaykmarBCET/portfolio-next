'use client'
import { usePublicProfileStore } from '@/store/public.store'
import Image from 'next/image'
import React, { useEffect } from 'react'

function ResumePage() {
  const { resumes, getResumes } = usePublicProfileStore()

  useEffect(() => {
    getResumes()
  }, [])

  if (!resumes || resumes.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 dark:text-gray-300">
        <p className="text-lg">No resumes uploaded yet 🚀</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full px-6 py-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-center text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        My Resumes
      </h1>

      <div className="flex flex-wrap justify-center items-center">
        {resumes.map((item) => (
          <div
            key={item._id}
            className="bg-white mx-auto mt-10 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden w-[380px] flex flex-col"
          >
            {/* Title */}
            <div className="px-4 py-3 border-b dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                {item.fileName}
              </h2>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {item.fileType}
              </span>
            </div>

            {/* File Preview */}
            <div className="relative w-full h-[500px] bg-gray-100 dark:bg-gray-700">
              {item.fileType === 'PDF' ? (
                <iframe
                  src={item.fileUrl}
                  className="w-full h-full"
                  scrolling='no'
                  title={item.fileName}
                />
              ) : (
                <Image
                  src={item.fileUrl}
                  alt={item.fileName as string}
                  width={380}
                  height={500}
                  className="object-contain w-full h-full"
                />
              )}
            </div>

            {/* Actions */}
            <div className="px-4 py-3 border-t dark:border-gray-700 flex justify-between items-center">
              <a
                href={item.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                View Full
              </a>
              <a
                href={item.fileUrl}
                download={item.fileName}
                className="text-sm text-green-600 hover:underline"
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResumePage
