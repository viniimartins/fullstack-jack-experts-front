import { Metadata } from 'next'
import Link from 'next/link'

import { FormLogin } from './form'

export const metadata: Metadata = {
  title: 'Login',
}

export default function Login() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-center text-3xl font-bold">TASKS</h1>
        <span className="text-sm text-muted-foreground">
          Organize suas tarefas de maneira simples e eficiente!
        </span>
      </div>
      <div className="mx-auto w-full max-w-md">
        <FormLogin />
        <div className="mt-4 text-center text-sm">
          <Link href="/nova-conta" className="underline">
            Nova Conta
          </Link>
        </div>
      </div>
    </>
  )
}
