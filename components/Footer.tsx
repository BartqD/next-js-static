'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950'>
      <div className='max-w-7xl mx-auto px-6 py-10'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
          {/* LEFT */}
          <div className='text-center md:text-left space-y-2'>
            <p className='text-sm font-semibold'>
              © {currentYear} TechFixer
            </p>
            <p className='text-sm text-slate-500 dark:text-slate-400'>
              Złota rączka – naprawy i montaże bez komplikacji
            </p>
          </div>

          {/* NAV */}
          <nav className='flex flex-wrap justify-center gap-6 text-sm font-medium'>
            <Link
              href='#hero'
              className='text-slate-600 dark:text-slate-400 hover:text-primary transition'
            >
              Start
            </Link>
            <Link
              href='#services'
              className='text-slate-600 dark:text-slate-400 hover:text-primary transition'
            >
              Usługi
            </Link>
            <Link
              href='#about'
              className='text-slate-600 dark:text-slate-400 hover:text-primary transition'
            >
              O mnie
            </Link>
            <Link
              href='#contact'
              className='text-slate-600 dark:text-slate-400 hover:text-primary transition'
            >
              Kontakt
            </Link>
          </nav>

          {/* CONTACT */}
          <div className='text-center md:text-right text-sm space-y-1'>
            <p className='font-medium'>📞 123 456 789</p>
            <p className='text-slate-500 dark:text-slate-400'>
              Pon–Pt • 8:00–18:00
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
