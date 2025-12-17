import { Clock, Calendar, MapPin, Bell, Users, Database } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SettingSection {
  title: string;
  description: string;
  icon: React.ElementType;
  settings: {
    label: string;
    description: string;
    value: string | boolean;
    type: "text" | "toggle" | "select";
    options?: string[];
  }[];
}

const settingsSections: SettingSection[] = [
  {
    title: "Order Cutoff",
    description: "Configure daily order processing times",
    icon: Clock,
    settings: [
      {
        label: "Daily Cutoff Time",
        description: "Orders after this time go to next business day",
        value: "13:10",
        type: "text",
      },
      {
        label: "Weekend Processing",
        description: "Allow order processing on weekends",
        value: false,
        type: "toggle",
      },
      {
        label: "Holiday Override",
        description: "Enable processing during busy periods",
        value: true,
        type: "toggle",
      },
    ],
  },
  {
    title: "Staff Defaults",
    description: "Default settings for staff assignments",
    icon: Users,
    settings: [
      {
        label: "Default Start Location",
        description: "Where staff routes begin",
        value: "Office (Roppongi)",
        type: "text",
      },
      {
        label: "Max Orders per Staff",
        description: "Maximum orders assigned to one person",
        value: "20",
        type: "text",
      },
      {
        label: "Auto-Assignment",
        description: "Automatically assign orders to available staff",
        value: true,
        type: "toggle",
      },
    ],
  },
  {
    title: "Route Optimization",
    description: "Configure route generation preferences",
    icon: MapPin,
    settings: [
      {
        label: "Optimization Priority",
        description: "How routes are optimized",
        value: "Speed",
        type: "select",
        options: ["Speed", "Distance", "Cost", "Balanced"],
      },
      {
        label: "Max Route Duration",
        description: "Maximum time for a single route",
        value: "4 hours",
        type: "text",
      },
      {
        label: "Include Return Trip",
        description: "Calculate time to return to start",
        value: true,
        type: "toggle",
      },
    ],
  },
  {
    title: "Notifications",
    description: "Configure alerts and notifications",
    icon: Bell,
    settings: [
      {
        label: "Cutoff Warning",
        description: "Alert before daily cutoff time",
        value: true,
        type: "toggle",
      },
      {
        label: "Order Failure Alerts",
        description: "Notify when purchases fail",
        value: true,
        type: "toggle",
      },
      {
        label: "Route Completion",
        description: "Notify when staff complete routes",
        value: false,
        type: "toggle",
      },
    ],
  },
];

export default function Settings() {
  return (
    <MainLayout title="Settings" subtitle="Configure system preferences">
      <div className="max-w-4xl space-y-6">
        {settingsSections.map((section, sectionIndex) => (
          <div
            key={section.title}
            className="rounded-xl border border-border bg-card card-shadow overflow-hidden animate-slide-up"
            style={{ animationDelay: `${sectionIndex * 50}ms` }}
          >
            {/* Section Header */}
            <div className="flex items-center gap-4 p-5 border-b border-border bg-muted/20">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <section.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{section.title}</h3>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
            </div>

            {/* Settings */}
            <div className="divide-y divide-border">
              {section.settings.map((setting) => (
                <div
                  key={setting.label}
                  className="flex items-center justify-between p-5 hover:bg-muted/10 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{setting.label}</p>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>

                  {setting.type === "toggle" ? (
                    <button
                      className={cn(
                        "relative h-6 w-11 rounded-full transition-colors",
                        setting.value ? "bg-primary" : "bg-muted"
                      )}
                    >
                      <span
                        className={cn(
                          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                          setting.value ? "left-[22px]" : "left-0.5"
                        )}
                      />
                    </button>
                  ) : setting.type === "select" ? (
                    <select className="h-9 rounded-lg border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                      {setting.options?.map((option) => (
                        <option key={option} value={option} selected={option === setting.value}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      defaultValue={setting.value as string}
                      className="h-9 w-32 rounded-lg border border-border bg-secondary px-3 text-sm text-foreground text-right focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Data Management */}
        <div className="rounded-xl border border-border bg-card card-shadow p-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-foreground">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Data Management</h3>
              <p className="text-sm text-muted-foreground">Import, export, and manage data</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button variant="outline">Import Stores</Button>
            <Button variant="outline">Export Orders</Button>
            <Button variant="outline">Backup Data</Button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </MainLayout>
  );
}
