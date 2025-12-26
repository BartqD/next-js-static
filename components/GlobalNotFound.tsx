'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Rocket } from 'lucide-react'

export default function GlobalNotFound() {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen w-full bg-linear-to-b from-blue-100 to-blue-200 text-center px-4 relative overflow-hidden'>
			<motion.div
				initial={{ y: 0 }}
				animate={{ y: [0, -15, 0] }}
				transition={{
					duration: 2,
					repeat: 4,
					ease: 'easeInOut',
				}}
				className='mb-6'>
				<Rocket className='w-20 h-20 text-blue-600 drop-shadow-lg' />
			</motion.div>

			<motion.h1
				initial={{ scale: 0.5, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
				className='text-8xl font-extrabold text-blue-700 drop-shadow-lg'>
				404
			</motion.h1>

			<motion.h2
				initial={{ y: 50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.3, duration: 0.6 }}
				className='text-2xl font-semibold text-gray-800 mt-4'>
				Strona nie znaleziona
			</motion.h2>

			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.6, duration: 0.6 }}
				className='text-gray-600 mt-2 mb-8 max-w-md'>
				Przepraszamy, ale strona, której szukasz, nie istnieje lub została przeniesiona.
			</motion.p>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.9, duration: 0.6 }}
				className='flex gap-4'>
				<Link
					href='/'
					className='px-6 py-3 bg-blue-600 text-white font-medium rounded-2xl shadow-lg hover:bg-blue-700 transition'>
					Home
				</Link>
				<Link
					href='/#contact'
					className='px-6 py-3 bg-white text-blue-600 font-medium rounded-2xl shadow-lg border border-blue-600 hover:bg-blue-50 transition'>
					Kontakt
				</Link>
			</motion.div>

			<motion.div
				initial={{ y: 50, opacity: 0 }}
				animate={{ y: 0, opacity: 0.5 }}
				transition={{ delay: 1.2, duration: 0.8 }}
				className='absolute bottom-8 text-sm text-gray-500'>
				© {new Date().getFullYear()} Bartosz Drozdek
			</motion.div>
		</div>
	)
}
