export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="container flex h-14 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          © {currentYear} Your Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
}