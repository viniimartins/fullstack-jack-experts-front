/* eslint-disable no-unused-vars */
import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      name: string
      id: string
      email: string
      token: string
    }
  }

  interface User {
    name: string
    id: string
    email: string
    token: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      name: string
      id: string
      email: string
      token: string
    }
  }
}
