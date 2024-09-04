import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { toast } from '@/hooks/use-toast'
import { api } from '@/service/api'

interface AccountRegistration {
  email: string
  name: string
  password: string
}

export interface CreateAccount {
  account: AccountRegistration
}

async function create({ account }: CreateAccount) {
  const { data } = await api.post('/account-registration', {
    ...account,
  })

  return data
}

export function useCreateAccount() {
  return useMutation({
    mutationFn: create,
    mutationKey: ['account-registration'],
    onError: (e) => {
      if (e instanceof AxiosError) {
        const error = e.response?.data.response

        console.log(error)

        switch (error) {
          case 'email':
            toast({
              variant: 'destructive',
              title: 'E-mail já existe',
              description:
                'O e-mail informado já está cadastrado. Por favor, use outro e-mail.',
            })
            break

          default:
            toast({
              variant: 'destructive',
              title: 'Ops! Algo deu errado',
              description:
                'Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.',
            })
            break
        }
      }
    },
  })
}
