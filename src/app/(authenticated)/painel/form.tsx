'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { QueryKey } from '@tanstack/react-query'
import { LoaderCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ModalActions } from '@/types/modal'

import { useCreateTask } from './hooks/use-create-task'
import { useUpdateTask } from './hooks/use-update-task'
import { Task } from './types'

const taskSchema = z.object({
  title: z
    .string({ required_error: 'Este campo é obrigatório.' })
    .min(1, { message: 'Este campo é obrigatório.' }),
  content: z
    .string({ required_error: 'Este campo é obrigatório.' })
    .min(1, { message: 'Este campo é obrigatório.' }),
})

interface ITaskForm extends z.infer<typeof taskSchema> {}

interface Props {
  formDialogActions: ModalActions<Task>
  toUpdateTask: Task | null
  queryKey: QueryKey
}

export function FormOrganization(props: Props) {
  const { formDialogActions, queryKey, toUpdateTask } = props

  const { mutateAsync: handleCreatetask, isPending } = useCreateTask({
    queryKey,
  })

  const { mutateAsync: handleaUpdatetask } = useUpdateTask({ queryKey })

  const form = useForm<ITaskForm>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: toUpdateTask?.title || '',
      content: toUpdateTask?.content || '',
    },
  })

  const {
    formState: { isSubmitting },
  } = form

  async function onSubmit(task: ITaskForm) {
    if (toUpdateTask) {
      handleaUpdatetask(
        {
          task: { ...task, id: toUpdateTask.id },
        },
        {
          onSuccess: () => formDialogActions.close(),
        },
      )
    }

    if (!toUpdateTask) {
      handleCreatetask(
        {
          task,
        },
        {
          onSuccess: () => formDialogActions.close(),
        },
      )
    }
  }

  const isLoading = isSubmitting || isPending

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o título da tarefa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Digite o conteúdo da tarefa"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="ml-auto flex gap-2">
            Salvar
            {isLoading && <LoaderCircle size={18} className="animate-spin" />}
          </Button>
        </form>
      </Form>
    </div>
  )
}
