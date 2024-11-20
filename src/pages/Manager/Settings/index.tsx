import { ManagerLayout } from "@/components/layouts/ManagerLayout";

export default function Settings() {
  return (
    <ManagerLayout
      title="Settings"
      description="Manage system settings"
    >
      <div className="space-y-6">
        <div className="rounded-lg bg-gray-100 p-8 text-center text-gray-500">
          Settings management coming soon
        </div>
      </div>
    </ManagerLayout>
  );
}