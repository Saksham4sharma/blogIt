import { Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({ subsets: ['latin'] ,weight:["400","500","600","700"] })

export const metadata = {
  title: 'BlogIt - Modern Blog Platform',
  description: 'BlogIt - A modern and responsive blog platform for sharing your thoughts, stories, and insights with the world.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>{children}</body>
    </html>
  )
}
