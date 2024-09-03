import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@/hooks/use-toast'
import { api } from '@/service/api'
import { QueryKeyProps } from '@/types/queryKeyProps'

export interface Params {
  taskId: string
}

async function deleteTask({ taskId }: Params) {
  const { data } = await api.delete(`/task/${taskId}`)

  return data
}

export function useDeleteTask({ queryKey }: QueryKeyProps) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTask,
    mutationKey: ['delete-task'],
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado',
        description:
          'Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.',
      })
    },
  })
}
