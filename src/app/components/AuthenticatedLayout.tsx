'use client'

import React from 'react'
import { useSession } from "next-auth/react"
import { redirect } from 'next/navigation'
import Sidebar from './Sidebar'

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  
  const { data: session, status } = useSession()
  console.log('Session:', session);

  if (status === 'loading') {
    return <div className="text-gray-300">Loading...</div>
  }

  if (status === 'unauthenticated') {
    redirect('/login')
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}