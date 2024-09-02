import Link from 'next/link'

import { FormLogin } from './form'

export default function Login() {
  return (
    <>
      <h1 className="mb-6 text-center text-3xl font-bold">TASKS</h1>
      <div className="mx-auto w-full max-w-md">
        <FormLogin />
        <div className="mt-4 text-center text-sm">
          <Link href="/new-account" className="underline">
            Nova Conta
          </Link>
        </div>
      </div>
    </>
  )
}
