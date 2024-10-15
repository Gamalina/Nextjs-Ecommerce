'use client'

import React from 'react'
import { Home, Box, Tag, ShoppingCart, Users, Settings, LogOut, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()

  const links = [
    { icon: Home, text: 'Dashboard', link: '/dashboard' },
    { icon: Box, text: 'Products', link: '/products' },
    { icon: Tag, text: 'Categories', link: '/categories' },
    { icon: ShoppingCart, text: 'Orders', link: '/orders' },
    { icon: Users, text: 'Admins', link: '/admins' },
    { icon: Settings, text: 'Settings', link: '/settings' },
    { icon: LogOut, text: 'Logout', link: '/api/auth/signout' },
  ]

  return (
    <aside className="w-64 h-screen bg-gray-800 p-0 hidden md:block">
      <div className="flex items-center mb-8 p-4">
        <ShoppingBag className="w-6 h-6 mr-2 text-blue-400" />
        <h1 className="text-xl font-semibold text-gray-100">Ecommerce Admin</h1>
      </div>
      <nav className="space-y-1">
        {links.map(({ icon: Icon, text, link }) => {
          const isActive = pathname === link
          return (
            <Link
              key={text}
              href={link}
              className={`flex items-center w-full p-2 rounded-lg transition-colors duration-150 ease-in-out ${
                isActive
                  ? 'bg-blue-600 text-gray-100'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-gray-100' : 'text-gray-400'}`} />
              <span className="flex-1">{text}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}