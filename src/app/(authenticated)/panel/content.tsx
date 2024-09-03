'use client'

import { DialogDescription } from '@radix-ui/react-dialog'
import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useModal } from '@/hooks/use-modal'

import { FormOrganization } from './form'
import { useDeleteTask } from './hooks/use-delete-task'
import { useGetTasks } from './hooks/use-get-tasks'
import { useToggleStatusTask } from './hooks/use-toggle-status-task'
import { Task } from './types'

export function Content() {
  const { data: tasks, queryKey } = useGetTasks()

  const { mutateAsync: handleToggleStatusTask } = useToggleStatusTask({
    queryKey,
  })

  const { mutateAsync: handleDeleteTask } = useDeleteTask({ queryKey })

  const {
    actions: formDialogActions,
    isOpen: formDialogIsOpen,
    target: toUpdateTask,
  } = useModal<Task>()

  return (
    <>
      <div className="container mx-auto flex flex-col gap-4 px-6 py-10">
        <Button
          className="ml-auto"
          variant="outline"
          onClick={() => formDialogActions.open()}
        >
          Adicionar Task
        </Button>

        {!tasks?.length && (
          <span className="text-xl font-semibold">
            Parece que voce nao tem nenhuma tarefa
          </span>
        )}

        {tasks?.map((task) => {
          const { completed, content, title, id } = task

          return (
            <Card key={id} className="rounded-none">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <span
                      data-completed={completed}
                      className="h-2 w-2 rounded-full bg-red-500 data-[completed=true]:bg-green-500"
                    />
                    <span
                      data-completed={completed}
                      className="text-2xl data-[completed=true]:line-through"
                    >
                      {title}
                    </span>
                  </CardTitle>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => formDialogActions.open(task)}
                      >
                        Update
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleToggleStatusTask({
                            completed: !completed,
                            taskId: id,
                          })
                        }
                      >
                        {completed ? 'Desfazer' : 'Concluir'}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          handleDeleteTask({ taskId: id })
                        }}
                      >
                        Deletar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-base text-muted-foreground">{content}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={formDialogIsOpen} onOpenChange={formDialogActions.close}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {toUpdateTask ? 'Editar Task' : 'Adicionar Task'}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {toUpdateTask
                ? 'Altere os dados da task existente.'
                : 'Preencha os dados para adicionar uma nova task.'}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-1">
            <FormOrganization
              formDialogActions={formDialogActions}
              toUpdateTask={toUpdateTask}
              queryKey={queryKey}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
