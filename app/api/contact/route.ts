import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY_TECHFIXER)

export async function POST(req: Request) {
	try {
		const { name, email, message } = await req.json()

		if (!name || !email || !message) {
			return NextResponse.json({ error: 'Brak wymaganych pól' }, { status: 400 })
		}

		const response = await resend.emails.send({
			from: 'Portfolio <kontakt@techfixer.pl>',
			to: 'kontakt@techfixer.pl',
			subject: `📩 Nowa wiadomość od ${name}`,
			html: `
        <p><b>Imię i nazwisko:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Wiadomość:</b></p>
        <p>${message}</p>
      `,
		})

		if (response.error) {
			return NextResponse.json({ error: 'Błąd wysyłki: ' + response.error.message, response }, { status: 500 })
		}

		return NextResponse.json({ success: true, response })
	} catch (error: any) {
		return NextResponse.json({ error: error.message || 'Błąd wysyłania wiadomości' }, { status: 500 })
	}
}
