import { LoaderCircle } from 'lucide-react'

export function LoadingSpinner() {
  return (
    <div className="flex h-screen items-center justify-center">
      <LoaderCircle className="animate-spin" size={40} />
    </div>
  )
}
