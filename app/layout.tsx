import './globals.css'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
// import ReactCookie from '@/components/cookieBot/ReactCookieBot'
import LogoImgLight from '../../../public/images/logo/logo-laptop-light.png'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

// export async function generateMetadata() {

// 	return {
// 		title: t('title'),
// 		description: t('description'),
// 		keywords: t('keywords').split(','),
// 		authors: [{ name: 'Bartosz Drozdek' }],
// 		creator: 'TechFixer',
// 		publisher: 'TechFixer',
// 		metadataBase: new URL('https://techfixer.pl'),
// 		openGraph: {
// 			title: t('ogTitle'),
// 			description: t('ogDescription'),
// 			url: 'https://techfixer.pl',
// 			siteName: 'TechFixer',
// 			type: 'website',
// 			image: { LogoImgLight },
// 		},
// 		robots: {
// 			index: false,
// 			follow: false,
// 		},
// 	}
// }

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='pl' suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
					{/* <ReactCookie locale='pl' /> */}
					<Navbar />
					{children}
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	)
}
