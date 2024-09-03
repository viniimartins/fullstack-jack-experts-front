import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { toast } from '@/hooks/use-toast'
import { api } from '@/service/api'

import { Task } from '../../types'

async function get() {
  const { data } = await api.get<Task[]>('/task')

  return data
}

export function useGetTasks() {
  const queryKey = ['get-tasks']

  const query = useQuery({
    queryKey,
    queryFn: get,
  })

  const { isError } = query

  useEffect(() => {
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'erro',
        description: 'erro',
      })
    }
  }, [isError])

  return { ...query, queryKey }
}
