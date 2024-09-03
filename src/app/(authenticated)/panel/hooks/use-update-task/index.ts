import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@/hooks/use-toast'
import { api } from '@/service/api'
import { QueryKeyProps } from '@/types/queryKeyProps'

interface Task {
  id: string
  title: string
  content: string
}

export interface Params {
  task: Task
}

async function update({ task }: Params) {
  const { id, ...rawTask } = task

  const { data } = await api.patch(`/task/${id}`, {
    ...rawTask,
  })

  return data
}

export function useUpdateTask({ queryKey }: QueryKeyProps) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: update,
    mutationKey: ['update-task'],
    onMutate: async ({ task: { title, id } }) => {
      await queryClient.cancelQueries({ queryKey })

      const previousTasks = queryClient.getQueryData<Task[]>(queryKey)

      queryClient.setQueryData(queryKey, (old?: Task[]) => {
        if (old) {
          return old.map((task) => (task.id === id ? { ...task, title } : task))
        }
        return old
      })

      return { previousTasks }
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousTasks)
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Erro ao atualizar a tarefa.',
      })
    },
  })
}
