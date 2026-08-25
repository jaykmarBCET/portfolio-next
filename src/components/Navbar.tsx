'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePublicProfileStore } from '@/store/public.store'

export default function Navbar() {
  const { user } = usePublicProfileStore()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
    { label: 'Workbench', href: '/private/login' },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      setIsOpen(false)
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#060b15]/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / User Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#98cbff] to-[#2fd9f4] text-[#060b15] font-black text-lg transition-transform group-hover:scale-105">
              {(user?.name || 'Jay')[0]}
            </div>
            <div>
              <span className="font-bold text-white tracking-tight text-base sm:text-lg block group-hover:text-[#2fd9f4] transition-colors">
                {user?.name || 'Jay Kumar'}
              </span>
              <span className="text-[10px] text-[#98cbff] uppercase tracking-widest block font-semibold -mt-0.5">
                Full Stack & Mobile
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-4 py-1.5 text-xs font-semibold text-[#bec7d4] hover:text-[#2fd9f4] transition-colors rounded-full hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="rounded-full bg-gradient-to-r from-[#98cbff] to-[#2fd9f4] px-4 py-2 text-xs font-bold text-[#060b15] shadow-lg shadow-[#2fd9f4]/20 transition-all hover:scale-105 active:scale-95"
            >
              Get In Touch
            </a>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#dae2fd] hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-xl">
              {isOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#070c17]/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1.5">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-[#dae2fd] hover:bg-white/5 hover:text-[#2fd9f4] transition-all border border-transparent hover:border-white/10"
              >
                <span>{item.label}</span>
                <span className="material-symbols-outlined text-base text-[#98cbff]">chevron_right</span>
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#98cbff] to-[#2fd9f4] py-3 text-center text-sm font-bold text-[#060b15] shadow-lg shadow-[#2fd9f4]/20"
            >
              Get In Touch
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
