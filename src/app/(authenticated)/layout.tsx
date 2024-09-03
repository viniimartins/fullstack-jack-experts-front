import type { ReactNode } from 'react'

import { Header } from '@/components/header'

export default async function AuthenticatedLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <main className="flex min-h-screen">
      <Header />

      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-1 flex-col gap-8 overflow-auto pt-32">
        {children}
      </section>
    </main>
  )
}
