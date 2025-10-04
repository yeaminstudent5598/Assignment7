import ChangePasswordForm from "../ChangePasswordForm";

export default function SettingsPage() {
  return (
    <div className="py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings.</p>
      </div>
      <ChangePasswordForm />
    </div>
  );
}