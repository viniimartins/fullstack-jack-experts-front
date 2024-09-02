import { withAuth } from 'next-auth/middleware'

import { env } from './lib/env/index.mjs'

export default withAuth({
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
  secret: env.NEXTAUTH_SECRET,
})

export const config = {
  matcher: ['/panel'],
}
