'use client'

import ContactCard from '@/components/ContactCard'
import React from 'react'

function ContactPage() {
  return (
    <div className='min-h-screen bg-[#060b15] py-16 px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-3xl'>
        <ContactCard />
      </div>
    </div>
  )
}

export default ContactPage