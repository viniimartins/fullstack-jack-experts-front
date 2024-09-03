import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@/hooks/use-toast'
import { api } from '@/service/api'
import { QueryKeyProps } from '@/types/queryKeyProps'

import { Task } from '../../types'

export interface Params {
  taskId: string
  completed: boolean
}

async function toggleStatusTask({ taskId, completed }: Params) {
  const { data } = await api.patch(`/task/${taskId}`, {
    completed,
  })

  return data
}

export function useToggleStatusTask({ queryKey }: QueryKeyProps) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: toggleStatusTask,
    mutationKey: ['toogle-status-task'],
    onMutate: async ({ taskId, completed }) => {
      await queryClient.cancelQueries({ queryKey })

      const previousOrganization = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, (old?: Task[]) => {
        if (old) {
          return old.map((task) =>
            task.id === taskId ? { ...task, completed } : task,
          )
        }
        return old
      })
      return { previousOrganization }
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousOrganization)

      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado',
        description:
          'Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.',
      })
    },
  })
}
