import { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: {
    template: 'Obra Vista | %s',
    default: 'Painel',
  },
}

export default async function AuthenticatedLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <main className="flex min-h-screen">
      <section className="flex min-h-screen w-full flex-1 flex-col gap-8 overflow-auto pt-32">
        <Header />

        {children}
      </section>
    </main>
  )
}
