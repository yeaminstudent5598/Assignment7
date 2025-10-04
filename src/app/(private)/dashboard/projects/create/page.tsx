import CreateProjectForm from "../../CreateProjectForm";

export default function CreateProjectPage() {
  return (
    <main className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create a New Project</h1>
        <p className="text-muted-foreground">Fill out the form to add a new project.</p>
      </div>
      <CreateProjectForm />
    </main>
  );
}