import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProjectNotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold">Project Not Found</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Sorry, we couldn't find the project you're looking for.
      </p>
      <Button asChild className="mt-6">
        <Link href="/projects">View All Projects</Link>
      </Button>
    </div>
  );
}