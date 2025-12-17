import { useState } from "react";
import { UserPlus, MapPin, Package, Route as RouteIcon, MoreVertical } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: "buyer" | "supervisor" | "admin";
  assignedOrders: number;
  assignedStores: number;
  completedToday: number;
  status: "active" | "en-route" | "idle" | "off-duty";
  startLocation: string;
  currentLocation?: string;
}

const mockStaff: StaffMember[] = [
  {
    id: "1",
    name: "Tanaka Hiroshi",
    email: "tanaka@company.com",
    phone: "090-1234-5678",
    avatar: "T",
    role: "buyer",
    assignedOrders: 12,
    assignedStores: 4,
    completedToday: 8,
    status: "en-route",
    startLocation: "Office (Roppongi)",
    currentLocation: "Shibuya District",
  },
  {
    id: "2",
    name: "Suzuki Yuki",
    email: "suzuki@company.com",
    phone: "090-2345-6789",
    avatar: "S",
    role: "buyer",
    assignedOrders: 8,
    assignedStores: 3,
    completedToday: 5,
    status: "active",
    startLocation: "Office (Roppongi)",
    currentLocation: "Shinjuku Station",
  },
  {
    id: "3",
    name: "Yamamoto Ken",
    email: "yamamoto@company.com",
    phone: "090-3456-7890",
    avatar: "Y",
    role: "supervisor",
    assignedOrders: 15,
    assignedStores: 5,
    completedToday: 10,
    status: "en-route",
    startLocation: "Home (Ikebukuro)",
    currentLocation: "Ginza Area",
  },
  {
    id: "4",
    name: "Watanabe Mei",
    email: "watanabe@company.com",
    phone: "090-4567-8901",
    avatar: "W",
    role: "buyer",
    assignedOrders: 6,
    assignedStores: 2,
    completedToday: 6,
    status: "idle",
    startLocation: "Office (Roppongi)",
  },
  {
    id: "5",
    name: "Ito Takeshi",
    email: "ito@company.com",
    phone: "090-5678-9012",
    avatar: "I",
    role: "buyer",
    assignedOrders: 10,
    assignedStores: 4,
    completedToday: 7,
    status: "active",
    startLocation: "Office (Roppongi)",
    currentLocation: "Akihabara",
  },
  {
    id: "6",
    name: "Sato Kenji",
    email: "sato@company.com",
    phone: "090-6789-0123",
    avatar: "SK",
    role: "buyer",
    assignedOrders: 0,
    assignedStores: 0,
    completedToday: 0,
    status: "off-duty",
    startLocation: "Office (Roppongi)",
  },
];

const statusConfig = {
  active: { label: "Active", color: "bg-success", textColor: "text-success" },
  "en-route": { label: "En Route", color: "bg-primary", textColor: "text-primary" },
  idle: { label: "Idle", color: "bg-warning", textColor: "text-warning" },
  "off-duty": { label: "Off Duty", color: "bg-muted-foreground", textColor: "text-muted-foreground" },
};

const roleConfig = {
  buyer: { label: "Buyer", className: "bg-secondary text-secondary-foreground" },
  supervisor: { label: "Supervisor", className: "bg-primary/20 text-primary" },
  admin: { label: "Admin", className: "bg-accent/20 text-accent" },
};

export default function Staff() {
  return (
    <MainLayout title="Staff Management" subtitle="Manage buyers and view assignments">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl border border-border bg-card p-4 card-shadow">
          <p className="text-sm text-muted-foreground">Total Staff</p>
          <p className="text-2xl font-bold text-foreground">{mockStaff.length}</p>
        </div>
        <div className="rounded-xl border border-success/20 bg-success/10 p-4">
          <p className="text-sm text-muted-foreground">Active Today</p>
          <p className="text-2xl font-bold text-success">
            {mockStaff.filter((s) => s.status !== "off-duty").length}
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/10 p-4">
          <p className="text-sm text-muted-foreground">En Route</p>
          <p className="text-2xl font-bold text-primary">
            {mockStaff.filter((s) => s.status === "en-route").length}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 card-shadow">
          <p className="text-sm text-muted-foreground">Completed Orders</p>
          <p className="text-2xl font-bold text-foreground">
            {mockStaff.reduce((acc, s) => acc + s.completedToday, 0)}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mb-6">
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add Staff
        </Button>
        <Button variant="secondary" className="gap-2">
          <RouteIcon className="h-4 w-4" />
          Auto-Assign All
        </Button>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockStaff.map((staff, index) => (
          <div
            key={staff.id}
            className="rounded-xl border border-border bg-card p-5 card-shadow hover:elevated-shadow transition-all duration-200 animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-lg">
                    {staff.avatar}
                  </div>
                  <span
                    className={cn(
                      "absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-card",
                      statusConfig[staff.status].color
                    )}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{staff.name}</h3>
                  <Badge className={cn("text-xs", roleConfig[staff.role].className)}>
                    {roleConfig[staff.role].label}
                  </Badge>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 mb-4">
              <span
                className={cn(
                  "text-sm font-medium",
                  statusConfig[staff.status].textColor
                )}
              >
                {statusConfig[staff.status].label}
              </span>
              {staff.currentLocation && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {staff.currentLocation}
                  </div>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-2 rounded-lg bg-muted/30">
                <p className="text-lg font-bold text-foreground">{staff.assignedOrders}</p>
                <p className="text-xs text-muted-foreground">Orders</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-muted/30">
                <p className="text-lg font-bold text-foreground">{staff.assignedStores}</p>
                <p className="text-xs text-muted-foreground">Stores</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-success/10">
                <p className="text-lg font-bold text-success">{staff.completedToday}</p>
                <p className="text-xs text-muted-foreground">Done</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 gap-1">
                <Package className="h-3 w-3" />
                Assign
              </Button>
              <Button variant="outline" size="sm" className="flex-1 gap-1">
                <RouteIcon className="h-3 w-3" />
                Route
              </Button>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
