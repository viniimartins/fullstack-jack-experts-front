'use client'

import { DialogDescription } from '@radix-ui/react-dialog'
import { MoreHorizontal } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
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
import { ScrollArea } from '@/components/ui/scroll-area'
import { useModal } from '@/hooks/use-modal'

import { CardSkeleton } from './components/skeleton-card'
import { FormOrganization } from './form'
import { useDeleteTask } from './hooks/use-delete-task'
import { useGetTasks } from './hooks/use-get-tasks'
import { useToggleStatusTask } from './hooks/use-toggle-status-task'
import { Task } from './types'

export function Content() {
  const { data: tasks, isFetching, queryKey } = useGetTasks()

  const { mutateAsync: handleToggleStatusTask } = useToggleStatusTask({
    queryKey,
  })

  const { mutateAsync: deleteTask } = useDeleteTask({ queryKey })

  const {
    actions: formDialogActions,
    isOpen: formDialogIsOpen,
    target: toUpdateTask,
  } = useModal<Task>()

  const {
    actions: alertDialogActions,
    isOpen: alertDialogIsOpen,
    target: toDeleteTask,
  } = useModal<Task>()

  function handleDeleteTask() {
    if (toDeleteTask) {
      deleteTask(
        { taskId: toDeleteTask.id },
        {
          onSuccess: () => alertDialogActions.close(),
        },
      )
    }
  }

  return (
    <>
      <div className="container mx-auto flex flex-col gap-4 px-6 py-10">
        <Button
          className="ml-auto"
          variant="outline"
          onClick={() => formDialogActions.open()}
        >
          Adicionar TASK
        </Button>

        {!isFetching && !tasks?.length && (
          <span className="text-xl font-normal">
            📝 Nenhuma TASK encontrada. Adicione uma nova{' '}
            <span
              className="text-2xl font-bold text-muted-foreground underline hover:cursor-pointer"
              onClick={() => formDialogActions.open()}
            >
              TASK
            </span>{' '}
            para começar!
          </span>
        )}

        {isFetching &&
          Array.from({ length: 4 }, (_, key) => {
            return <CardSkeleton key={key} />
          })}

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
                        Editar
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
                          alertDialogActions.open(task)
                        }}
                      >
                        Deletar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent>
                <ScrollArea className="h-14">
                  <p className="text-base text-muted-foreground">{content}</p>
                </ScrollArea>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={formDialogIsOpen} onOpenChange={formDialogActions.close}>
        <DialogContent className="mx-auto w-full max-w-md sm:w-11/12 md:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {toUpdateTask ? 'Editar TASK' : 'Adicionar TASK'}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {toUpdateTask
                ? 'Altere os dados da TASK existente.'
                : 'Preencha os dados para adicionar uma nova TASK.'}
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

      <AlertDialog
        open={alertDialogIsOpen}
        onOpenChange={alertDialogActions.close}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão de TASK</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a excluir uma tarefa. Esta ação é permanente e
              não poderá ser desfeita. Tem certeza de que deseja continuar com a
              exclusão?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTask}>
              Confirmar Exclusão
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
