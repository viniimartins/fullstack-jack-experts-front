'use client'

import { LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
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

  return (
    <header className="tablet:w-screen fixed top-0 z-10 flex h-20 w-full items-center border-b bg-background px-8">
      <div className="tablet:hidden z-40 flex w-full items-center justify-between">
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
                <Avatar className="h-16 w-16 border-2 text-muted-foreground">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

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
              <DropdownMenuItem
                className="flex items-center gap-2 p-3 font-normal"
                onClick={() => signOut()}
              >
                <LogOut size={20} />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="tablet:flex hidden w-full justify-between gap-3">
        <Button variant="secondary" size="icon" className="rounded-full">
          {session?.user.name[0]}
          <span className="sr-only">Toggle user menu</span>
        </Button>

        {/* <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="tablet:flex hidden"
              onClick={() => toggleOpen()}
            >
              <motion.div
                animate={{ scale: isOpen ? 1.2 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Menu className="h-5 w-5" />
              </motion.div>
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            onEscapeKeyDown={() => toggleOpen()}
            onPointerDownOutside={() => toggleOpen()}
          >
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </Link>
              <Link href="#" className="hover:text-foreground">
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet> */}
      </div>
    </header>
  )
}
