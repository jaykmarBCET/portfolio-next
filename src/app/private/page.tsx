'use client'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { AllPrivatePage } from '@/constants/constant'
import { useProfileStore } from '@/store/store'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect } from 'react'

function PrivateHomePage() {
  const router = useRouter()
  const {user,getUser} = useProfileStore()
  const authenticationChecker = useCallback(async()=>{
    await getUser()

    if(!user){
      router.push("/private/login")
    }
  },[getUser, router, user])

  useEffect(()=>{
    authenticationChecker()
  },[authenticationChecker])

  return (
    <div className='flex flex-col items-center w-full min-h-screen px-4 sm:px-6 lg:px-10 py-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white'>
      <h1 className='text-3xl sm:text-4xl font-extrabold italic mb-10 sm:mb-12 tracking-wide text-center'>
        Developer Workbench
      </h1>
      
      <div className='grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl'>
        {AllPrivatePage.map((item, idx) => (
          <Card 
            key={idx} 
            onClick={() => router.push(item.pageRoot)}
            className="flex flex-col justify-between rounded-2xl p-6 cursor-pointer 
                       bg-white backdrop-blur-md border border-white/20
                       hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] 
                       transition-all duration-300 ease-in-out min-h-[220px]"
          >
            <CardHeader className="flex items-start gap-3">
              <item.icon className="h-10 w-10 text-blue-400 shrink-0" />
              <div>
                <CardTitle className="text-lg text-black sm:text-xl font-semibold">{item.name}</CardTitle>
                {item.description && (
                  <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
            </CardHeader>

            <CardContent className="mt-6">
              <Button 
                variant="secondary" 
                className="w-full font-semibold bg-blue-600 hover:bg-blue-700 text-white"
              >
                Open
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default PrivateHomePage
