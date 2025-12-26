'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { HiMenu, HiX, HiSun, HiMoon } from 'react-icons/hi'
import Link from 'next/link'
import { motion } from 'motion/react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeId, setActiveId] = useState<string>('#hero')
  const pathname = usePathname()

  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)

    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )

    sections.forEach(section => observer.observe(section))
    return () => sections.forEach(section => observer.unobserve(section))
  }, [pathname])

  const navigation = [
    { name: 'Start', href: '#hero', section: '#hero' },
    { name: 'Usługi', href: '#services', section: '#services' },
    { name: 'O mnie', href: '#about', section: '#about' },
    { name: 'Kontakt', href: '#contact', section: '#contact' },
  ]

  return (
    <nav className='fixed top-0 w-full z-50 backdrop-blur border-b border-gray-200/20'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex items-center justify-between h-16 lg:h-20'>
          {/* LOGO */}
          <Link href='#hero' className='text-xl font-bold text-primary'>
            TechFixer
          </Link>

          {/* DESKTOP NAV */}
          <div className='hidden md:flex space-x-8'>
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative font-medium transition-colors
                  ${
                    activeId === item.section
                      ? 'text-primary after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary'
                      : 'opacity-70 hover:opacity-100'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* ACTIONS */}
          <div className='flex items-center space-x-3'>
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label='Zmień motyw'
                className='p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition'
              >
                {theme === 'dark' ? (
                  <HiSun className='h-5 w-5' />
                ) : (
                  <HiMoon className='h-5 w-5' />
                )}
              </button>
            )}

            {/* MOBILE MENU */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition'
              aria-label='Menu'
            >
              {isOpen ? <HiX className='h-6 w-6' /> : <HiMenu className='h-6 w-6' />}
            </button>
          </div>
        </div>

        {/* MOBILE NAV */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className='md:hidden flex flex-col space-y-2 py-4'
          >
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`text-center py-3 rounded-lg font-semibold transition
                  ${
                    activeId === item.section
                      ? 'text-primary'
                      : 'opacity-80 hover:opacity-100'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  )
}
