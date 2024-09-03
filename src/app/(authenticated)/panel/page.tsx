import { Metadata } from 'next'

import { Content } from './content'

export const metadata: Metadata = {
  title: 'Painel',
}

export default function Home() {
  return <Content />
}
