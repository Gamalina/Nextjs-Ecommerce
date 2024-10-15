'use client'
import AuthenticatedLayout from '../components/AuthenticatedLayout';
import { useSession } from 'next-auth/react';
import Image from 'next/image'

export default function DashboardPage() {
  const { data : session} = useSession();
  const StatCard = ({ title, value, subtitle }: { title: string; value: string; subtitle: string }) => (
    <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-3xl font-bold text-blue-400 mb-1">{value}</p>
      <p className="text-gray-400 text-sm">{subtitle}</p>
    </div>
  )
  return (
    
    <AuthenticatedLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-100">Grettings, {session?.user?.name}!</h1>
        <div className="flex items-center">
          <Image
            src="/placeholder.svg?height=32&width=32"
            alt="User"
            width={32}
            height={32}
            className="rounded-full mr-2"
          />
          <span className="text-gray-300">User</span>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">Orders</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="TODAY" value="2" subtitle="2 orders today" />
          <StatCard title="THIS WEEK" value="25" subtitle="25 orders this week" />
          <StatCard title="THIS MONTH" value="32" subtitle="32 orders this month" />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-100">Revenue</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="TODAY" value="$ 85,765" subtitle="2 orders today" />
          <StatCard title="THIS WEEK" value="$ 226,600" subtitle="25 orders this week" />
          <StatCard title="THIS MONTH" value="$ 230,093" subtitle="32 orders this month" />
        </div>
      </section>
    </AuthenticatedLayout>
  );
}