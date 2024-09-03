import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@/hooks/use-toast'
import { api } from '@/service/api'
import { QueryKeyProps } from '@/types/queryKeyProps'

interface Task {
  title: string
  content: string
}

export interface Params {
  task: Task
}

async function create({ task }: Params) {
  const { data } = await api.post('/task', task)

  return data
}

export function useCreateTask({ queryKey }: QueryKeyProps) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: create,
    mutationKey: ['create-task'],
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Erro',
      })
    },
  })
}
