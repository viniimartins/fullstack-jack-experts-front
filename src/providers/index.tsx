'use client'

import { type PropsWithChildren } from 'react'
import { ThemeProvider } from './theme'
import React from 'react'

// export function Providers({ children }: PropsWithChildren) {
//   return (
//     <NextAuthProvider>
//       <ReactQueryProvider>
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <Toaster />
//         </ThemeProvider>
//       </ReactQueryProvider>
//     </NextAuthProvider>
//   )
// }


export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      {/* <Toaster /> */}
    </ThemeProvider>
  )
}
