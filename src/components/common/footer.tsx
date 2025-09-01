import { format } from "date-fns"

type Dictionary = {
  info: string;
}

export default function Footer({ dictionary }: { dictionary: Dictionary }) {
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-sm text-muted-foreground">
          © {format(new Date(), 'yyyy')} $_Vladislav's Projects. {dictionary.info}
        </p>
      </div>
    </footer>
  )
}
