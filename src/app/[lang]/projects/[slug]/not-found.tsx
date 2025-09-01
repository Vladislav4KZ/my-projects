import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4">
      <h1 className="text-4xl font-bold font-headline">Project Not Found</h1>
      <p className="mt-4 text-lg text-muted-foreground">The project you are looking for does not exist.</p>
      <Button asChild className="mt-8">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  )
}
