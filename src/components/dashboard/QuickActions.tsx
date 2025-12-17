import { Upload, UserPlus, MapPin, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  {
    icon: Upload,
    label: "Import Orders",
    description: "Upload from Robot-in",
    variant: "default" as const,
  },
  {
    icon: UserPlus,
    label: "Assign Staff",
    description: "Auto-assign today's orders",
    variant: "secondary" as const,
  },
  {
    icon: MapPin,
    label: "Generate Routes",
    description: "Optimize all routes",
    variant: "secondary" as const,
  },
  {
    icon: RefreshCw,
    label: "Sync Status",
    description: "Update purchase status",
    variant: "secondary" as const,
  },
];

export function QuickActions() {
  return (
    <div className="rounded-xl border border-border bg-card card-shadow p-5">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Button
            key={action.label}
            variant={action.variant}
            className="h-auto flex-col items-start gap-2 p-4 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <action.icon className="h-5 w-5" />
            <div className="text-left">
              <p className="font-medium">{action.label}</p>
              <p className="text-xs opacity-70 font-normal">
                {action.description}
              </p>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
