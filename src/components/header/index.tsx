'use client'

import { LogOut, MoonIcon, SunIcon } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export function Header() {
  const { data: session } = useSession()

  const { setTheme, theme } = useTheme()

  return (
    <header className="fixed top-0 z-10 flex h-20 w-full items-center border-b bg-background px-8">
      <div className="z-40 mx-auto flex w-full max-w-7xl items-center justify-between">
        <span className="text-2xl font-semibold">TASKS</span>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                {session?.user.name[0]}
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center" className="w-72 py-3">
              <div className="flex flex-col items-center justify-center space-y-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-14 w-14 rounded-full"
                >
                  {session?.user.name[0]}
                  <span className="sr-only">Toggle user menu</span>
                </Button>

                <div className="flex flex-col items-center justify-center gap-3 pb-2">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-base font-medium">
                      {session?.user.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {session?.user.email}
                    </span>
                  </div>
                </div>
              </div>

              <DropdownMenuSeparator />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex w-full justify-start gap-2 border-none p-2"
                  >
                    <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:hidden dark:-rotate-90 dark:scale-0" />
                    <MoonIcon className="hidden h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:flex dark:rotate-0 dark:scale-100" />
                    {theme ? 'Escuro' : 'Claro'}
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme('light')}>
                    Claro
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('dark')}>
                    Escuro
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="flex items-center gap-2 p-2 font-normal"
                onClick={() => signOut()}
              >
                <LogOut size={20} />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
