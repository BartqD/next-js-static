'use client'

import { motion } from 'framer-motion'
import { HiPhone, HiMail } from 'react-icons/hi'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import ExportedImage from 'next-image-export-optimizer'

import LogoLaptopLight from '../public/images/logo/logo-laptop-light.png'
import LogoLaptopDark from '../public/images/logo/logo-laptop-dark.png'

export default function Hero() {
	const { theme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => setMounted(true), [])

	return (
		<section
			id='hero'
			className='relative min-h-screen flex items-center overflow-hidden
        bg-linear-to-b from-slate-50 to-white
        dark:from-slate-900 dark:to-slate-950'>
			{/* background accents */}
			<div className='absolute top-20 left-1/2 -translate-x-1/2 w-100 h-50 bg-primary/20 rounded-full blur-3xl' />
			<div className='absolute bottom-0 w-full h-30 bg-primary/10 blur-3xl' />

			<div className='max-w-7xl mx-auto px-6 relative z-10'>
				<div className='grid lg:grid-cols-2 gap-14 items-center'>
					{/* TEXT */}
					<motion.div
						initial={{ opacity: 0, x: -40 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className='text-center lg:text-left space-y-6'>
						<h1 className='text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight'>
							Złota rączka
							<span className='block text-primary'>Naprawy i montaże bez komplikacji</span>
						</h1>

						<p className='text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0'>
							Montaż mebli, lamp, TV, regulacja drzwi i okien, drobne naprawy oraz prace techniczne. Szybko, rzetelnie i
							u Ciebie na miejscu.
						</p>

						<div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
							<a
								href='tel:123456789'
								className='inline-flex items-center justify-center gap-2
                  rounded-lg btn-primary px-6 py-3 font-semibold text-white
                  hover:opacity-90 transition shadow-md'>
								<HiPhone className='h-5 w-5' />
								Zadzwoń teraz
							</a>

							<Link
								href='#contact'
								className='inline-flex items-center btn-secornary justify-center gap-2
                  rounded-lg border px-6 py-3 font-semibold
                  hover:bg-slate-100 dark:hover:bg-slate-800 transition'>
								<HiMail className='h-5 w-5' />
								Wyślij zapytanie
							</Link>
						</div>

						<p className='text-sm text-slate-500 dark:text-slate-400'>Działam lokalnie • Pon–Pt • Szybkie terminy</p>
					</motion.div>

					{/* IMAGE */}
					<motion.div
						initial={{ opacity: 0, x: 40 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className='flex justify-center'>
						<div className='relative'>
							<ExportedImage
								src={mounted && theme === 'dark' ? LogoLaptopDark : LogoLaptopLight}
								alt='TechFixer – złota rączka'
								width={300}
								height={300}
								className='object-contain'
							/>

							{/* floating accents */}
							<motion.div
								animate={{ y: [-6, 6, -6] }}
								transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
								className='absolute -top-6 -right-8 w-8 h-8 bg-primary rotate-45 opacity-80'
							/>

							<motion.div
								animate={{ y: [6, -6, 6] }}
								transition={{ repeat: Infinity, duration: 4, delay: 1, ease: 'easeInOut' }}
								className='absolute -bottom-6 -left-8 w-6 h-6 bg-primary rotate-45 opacity-60'
							/>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	)
}
