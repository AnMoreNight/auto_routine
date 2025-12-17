import { MapPin, Package, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface StaffMember {
  id: string;
  name: string;
  avatar: string;
  assignedOrders: number;
  assignedStores: number;
  status: "active" | "en-route" | "idle";
  currentLocation?: string;
}

const mockStaff: StaffMember[] = [
  {
    id: "1",
    name: "Tanaka",
    avatar: "T",
    assignedOrders: 12,
    assignedStores: 4,
    status: "en-route",
    currentLocation: "Shibuya District",
  },
  {
    id: "2",
    name: "Suzuki",
    avatar: "S",
    assignedOrders: 8,
    assignedStores: 3,
    status: "active",
    currentLocation: "Shinjuku Station",
  },
  {
    id: "3",
    name: "Yamamoto",
    avatar: "Y",
    assignedOrders: 15,
    assignedStores: 5,
    status: "en-route",
    currentLocation: "Ginza Area",
  },
  {
    id: "4",
    name: "Watanabe",
    avatar: "W",
    assignedOrders: 6,
    assignedStores: 2,
    status: "idle",
  },
  {
    id: "5",
    name: "Ito",
    avatar: "I",
    assignedOrders: 10,
    assignedStores: 4,
    status: "active",
    currentLocation: "Akihabara",
  },
];

const statusConfig = {
  active: { label: "Active", color: "bg-success" },
  "en-route": { label: "En Route", color: "bg-primary" },
  idle: { label: "Idle", color: "bg-muted-foreground" },
};

export function StaffOverview() {
  return (
    <div className="rounded-xl border border-border bg-card card-shadow">
      <div className="border-b border-border px-6 py-4">
        <h3 className="text-lg font-semibold text-foreground">Staff Status</h3>
        <p className="text-sm text-muted-foreground">
          {mockStaff.filter((s) => s.status !== "idle").length} active today
        </p>
      </div>
      <div className="divide-y divide-border">
        {mockStaff.map((staff, index) => (
          <div
            key={staff.id}
            className="flex items-center gap-4 px-6 py-4 hover:bg-muted/20 transition-colors animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Avatar */}
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                {staff.avatar}
              </div>
              <span
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card",
                  statusConfig[staff.status].color
                )}
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground">
                  {staff.name}
                </p>
                <span className="text-xs text-muted-foreground px-1.5 py-0.5 rounded bg-muted">
                  {statusConfig[staff.status].label}
                </span>
              </div>
              {staff.currentLocation && (
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">
                    {staff.currentLocation}
                  </p>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Package className="h-4 w-4" />
                <span>{staff.assignedOrders}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{staff.assignedStores}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
