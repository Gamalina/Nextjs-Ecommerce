import AuthContext from './lib/AuthContext'
import "./globals.css"
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'E-commerce Admin',
  description: 'Admin panel for e-commerce management',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-100">
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  )
}