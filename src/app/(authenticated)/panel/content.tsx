'use client'

import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useGetTasks } from './hooks/use-get-tasks'

export function Content() {
  const { data: tasks } = useGetTasks()

  return (
    <div className="container mx-auto flex flex-col gap-4 px-6 py-10">
      <Button className="ml-auto" variant="outline">
        Adicionar Task
      </Button>

      {tasks?.map(({ completed, content, title, id }) => (
        <Card key={id} className="rounded-none">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <span
                  data-completed={completed}
                  className="h-2 w-2 rounded-full bg-red-500 data-[completed=true]:bg-green-500"
                />
                <span className="text-2xl">{title}</span>
              </CardTitle>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Update</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-base text-muted-foreground">{content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
