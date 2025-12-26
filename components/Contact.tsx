'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMail, HiPhone, HiLocationMarker, HiPaperAirplane, HiCheckCircle, HiXCircle } from 'react-icons/hi'

export default function Contact() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	})

	const [errors, setErrors] = useState({
		name: '',
		email: '',
		message: '',
	})

	const [isSubmitting, setIsSubmitting] = useState(false)
	const [modal, setModal] = useState<{ open: boolean; success: boolean }>({
		open: false,
		success: true,
	})

	const nameRef = useRef<HTMLInputElement>(null)
	const emailRef = useRef<HTMLInputElement>(null)
	const messageRef = useRef<HTMLTextAreaElement>(null)

	const validateForm = () => {
		const newErrors = { name: '', email: '', message: '' }
		let valid = true

		if (!formData.name.trim()) {
			newErrors.name = 'Podaj imię'
			valid = false
			nameRef.current?.focus()
		} else if (!formData.email.trim()) {
			newErrors.email = 'Podaj adres e-mail'
			valid = false
			emailRef.current?.focus()
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = 'Nieprawidłowy adres e-mail'
			valid = false
			emailRef.current?.focus()
		} else if (!formData.message.trim()) {
			newErrors.message = 'Opisz krótko problem'
			valid = false
			messageRef.current?.focus()
		}

		setErrors(newErrors)
		return valid
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!validateForm()) return

		setIsSubmitting(true)

		try {
			const res = await fetch('api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			})

			if (!res.ok) throw new Error('Error')

			setFormData({ name: '', email: '', message: '' })
			setModal({ open: true, success: true })
		} catch {
			setModal({ open: true, success: false })
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
		setErrors(prev => ({ ...prev, [name]: '' }))
	}

	return (
		<section id='contact' className='py-24 bg-slate-50 dark:bg-slate-950'>
			<div className='max-w-7xl mx-auto px-6'>
				{/* HEADER */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='text-center mb-16'>
					<h2 className='text-3xl md:text-4xl font-bold mb-4'>
						Skontaktuj się
						<span className='block text-primary'>szybka wycena i termin</span>
					</h2>
					<p className='text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto'>
						Zadzwoń lub napisz. Opisz problem, a ja oddzwonię lub zaproponuję termin realizacji.
					</p>
				</motion.div>

				<div className='grid lg:grid-cols-2 gap-12'>
					{/* FORM */}
					<motion.div
						initial={{ opacity: 0, x: -40 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className='bg-white dark:bg-slate-900 rounded-xl p-8 shadow'>
						<form onSubmit={handleSubmit} className='space-y-6'>
							<div>
								<label className='block text-sm font-medium mb-2'>Imię *</label>
								<input
									ref={nameRef}
									type='text'
									name='name'
									value={formData.name}
									onChange={handleChange}
									className={`w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-primary
                    ${errors.name ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'}`}
								/>
								{errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name}</p>}
							</div>

							<div>
								<label className='block text-sm font-medium mb-2'>E-mail *</label>
								<input
									ref={emailRef}
									type='email'
									name='email'
									value={formData.email}
									onChange={handleChange}
									className={`w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-primary
                    ${errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'}`}
								/>
								{errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
							</div>

							<div>
								<label className='block text-sm font-medium mb-2'>Opis problemu *</label>
								<textarea
									ref={messageRef}
									name='message'
									rows={5}
									value={formData.message}
									onChange={handleChange}
									className={`w-full rounded-lg border px-4 py-3 resize-none focus:ring-2 focus:ring-primary
                    ${errors.message ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'}`}
								/>
								{errors.message && <p className='text-red-500 text-sm mt-1'>{errors.message}</p>}
							</div>

							<button
								type='submit'
								disabled={isSubmitting}
								className='w-full flex items-center justify-center gap-2 rounded-lg btn-primary px-6 py-3 font-semibold text-white hover:opacity-90 transition disabled:opacity-60'>
								<HiPaperAirplane className='h-5 w-5' />
								{isSubmitting ? 'Wysyłanie...' : 'Wyślij zapytanie'}
							</button>
						</form>
					</motion.div>

					{/* INFO */}
					<motion.div
						initial={{ opacity: 0, x: 40 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className='space-y-6'>
						{[
							{
								icon: HiPhone,
								title: 'Telefon',
								value: '123 456 789',
							},
							{
								icon: HiMail,
								title: 'E-mail',
								value: 'kontakt@techfixer.pl',
							},
							{
								icon: HiLocationMarker,
								title: 'Obszar działania',
								value: 'Lokalnie – dojazd do klienta',
							},
						].map(item => (
							<div
								key={item.title}
								className='flex items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-xl shadow'>
								<div className='p-3 bg-primary/10 rounded-full'>
									<item.icon className='h-6 w-6 text-primary' />
								</div>
								<div>
									<p className='font-semibold'>{item.title}</p>
									<p className='text-slate-600 dark:text-slate-300'>{item.value}</p>
								</div>
							</div>
						))}
					</motion.div>
				</div>

				{/* MODAL */}
				<AnimatePresence>
					{modal.open && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'
							onClick={() => setModal({ ...modal, open: false })}>
							<motion.div
								initial={{ scale: 0.9 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0.9 }}
								className='bg-white dark:bg-slate-900 rounded-xl p-8 text-center max-w-md mx-4'
								onClick={e => e.stopPropagation()}>
								{modal.success ? (
									<>
										<HiCheckCircle className='h-16 w-16 text-green-500 mx-auto mb-4' />
										<h3 className='text-xl font-bold mb-2'>Wiadomość wysłana</h3>
										<p>Skontaktuję się z Tobą najszybciej jak to możliwe.</p>
									</>
								) : (
									<>
										<HiXCircle className='h-16 w-16 text-red-500 mx-auto mb-4' />
										<h3 className='text-xl font-bold mb-2'>Coś poszło nie tak</h3>
										<p>Spróbuj ponownie lub zadzwoń bezpośrednio.</p>
									</>
								)}

								<button
									className='mt-6 w-full rounded-lg btn-primary px-6 py-3 text-white font-semibold'
									onClick={() => setModal({ ...modal, open: false })}>
									Zamknij
								</button>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</section>
	)
}
