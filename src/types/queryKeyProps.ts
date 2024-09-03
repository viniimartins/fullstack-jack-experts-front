import { QueryKey } from '@tanstack/react-query'

export type QueryKeyProps<T = unknown> = T & {
  queryKey: QueryKey
}
