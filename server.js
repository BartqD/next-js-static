import express from 'express'
import cors from 'cors'
import { Resend } from 'resend'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

// DYNAMICZNY CORS: Akceptuje zapytanie z Twojej domeny bez względu na to czy jest z WWW czy bez
app.use(cors({
  origin: function (origin, callback) {
    // Pozwala na brak origin (np. Postman) lub domeny techfixer.pl
    if (!origin || origin.includes('techfixer.pl')) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}))

app.use(express.json())

// MIDDLEWARE DO DEBUGOWANIA: Sprawdzimy w logach SEOHOST, jaką ścieżkę widzi Express
app.use((req, res, next) => {
  console.log(`Otrzymano zapytanie: ${req.method} ${req.url}`);
  next();
});

const resend = new Resend(process.env.RESEND_API_KEY_TECHFIXER)

// Obsługa obu wariantów ścieżki na wypadek specyficznej konfiguracji SEOHOST
const contactHandler = async (req, res) => {
  const { name, email, message } = req.body
  if (!name || !email || !message) return res.status(400).json({ error: 'Brak pól' })

  try {
    await resend.emails.send({
      from: 'Portfolio <kontakt@techfixer.pl>',
      to: 'kontakt@techfixer.pl',
      subject: `📩 Nowa wiadomość: ${name}`,
      html: `<p>Od: ${name} (${email})</p><p>${message}</p>`
    })
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

app.post('/contact', contactHandler)      // Dla techfixer.pl/api/contact
app.post('/api/contact', contactHandler)  // Rezerwowo, jeśli Passenger nie ucina przedrostka

// Testowy endpoint pod adresem głównym aplikacji
app.get('/', (req, res) => res.send('API TechFixer jest aktywne!'))

app.listen()