import { useState } from "react";
import { MapPin, Navigation, Clock, ChevronRight, Play, RefreshCw } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RouteStop {
  id: string;
  storeName: string;
  address: string;
  orders: number;
  estimatedTime: string;
  status: "pending" | "current" | "completed";
}

interface StaffRoute {
  id: string;
  staffName: string;
  staffAvatar: string;
  status: "not-started" | "in-progress" | "completed";
  totalStops: number;
  completedStops: number;
  estimatedDuration: string;
  stops: RouteStop[];
}

const mockRoutes: StaffRoute[] = [
  {
    id: "1",
    staffName: "Tanaka Hiroshi",
    staffAvatar: "T",
    status: "in-progress",
    totalStops: 4,
    completedStops: 2,
    estimatedDuration: "2h 45m",
    stops: [
      { id: "1-1", storeName: "Electronics Plaza Shibuya", address: "Shibuya", orders: 3, estimatedTime: "10:30", status: "completed" },
      { id: "1-2", storeName: "Muji Shinjuku", address: "Shinjuku", orders: 2, estimatedTime: "11:15", status: "completed" },
      { id: "1-3", storeName: "Bic Camera Ikebukuro", address: "Ikebukuro", orders: 4, estimatedTime: "12:30", status: "current" },
      { id: "1-4", storeName: "Uniqlo Ginza", address: "Ginza", orders: 3, estimatedTime: "14:00", status: "pending" },
    ],
  },
  {
    id: "2",
    staffName: "Suzuki Yuki",
    staffAvatar: "S",
    status: "in-progress",
    totalStops: 3,
    completedStops: 1,
    estimatedDuration: "2h 00m",
    stops: [
      { id: "2-1", storeName: "Gourmet Market Ginza", address: "Ginza", orders: 5, estimatedTime: "10:00", status: "completed" },
      { id: "2-2", storeName: "Specialty Foods Daikanyama", address: "Daikanyama", orders: 2, estimatedTime: "11:30", status: "current" },
      { id: "2-3", storeName: "Itoya Stationery", address: "Ginza", orders: 1, estimatedTime: "12:30", status: "pending" },
    ],
  },
  {
    id: "3",
    staffName: "Yamamoto Ken",
    staffAvatar: "Y",
    status: "not-started",
    totalStops: 5,
    completedStops: 0,
    estimatedDuration: "3h 15m",
    stops: [
      { id: "3-1", storeName: "Tech Hub Akihabara", address: "Akihabara", orders: 6, estimatedTime: "10:00", status: "pending" },
      { id: "3-2", storeName: "Electronics Plaza Akihabara", address: "Akihabara", orders: 3, estimatedTime: "10:45", status: "pending" },
      { id: "3-3", storeName: "Camera Store Shinjuku", address: "Shinjuku", orders: 2, estimatedTime: "12:00", status: "pending" },
      { id: "3-4", storeName: "Audio Shop Shibuya", address: "Shibuya", orders: 2, estimatedTime: "13:15", status: "pending" },
      { id: "3-5", storeName: "Home Goods Meguro", address: "Meguro", orders: 2, estimatedTime: "14:30", status: "pending" },
    ],
  },
];

const routeStatusConfig = {
  "not-started": { label: "Not Started", className: "bg-muted text-muted-foreground" },
  "in-progress": { label: "In Progress", className: "bg-primary/20 text-primary" },
  completed: { label: "Completed", className: "bg-success/20 text-success" },
};

const stopStatusConfig = {
  pending: "border-border bg-muted/30",
  current: "border-primary bg-primary/10",
  completed: "border-success/30 bg-success/10",
};

export default function Routes() {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(mockRoutes[0].id);

  const activeRoute = mockRoutes.find((r) => r.id === selectedRoute);

  return (
    <MainLayout title="Route Planning" subtitle="Optimize and track staff routes">
      {/* Actions */}
      <div className="flex gap-3 mb-6">
        <Button className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Regenerate All Routes
        </Button>
        <Button variant="secondary" className="gap-2">
          <Play className="h-4 w-4" />
          Start All Routes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Route List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Today's Routes</h3>
          {mockRoutes.map((route, index) => (
            <button
              key={route.id}
              onClick={() => setSelectedRoute(route.id)}
              className={cn(
                "w-full rounded-xl border p-4 text-left transition-all duration-200 animate-slide-up",
                selectedRoute === route.id
                  ? "border-primary bg-primary/10 shadow-lg"
                  : "border-border bg-card hover:border-primary/50 card-shadow"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  {route.staffAvatar}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{route.staffName}</p>
                  <Badge className={cn("text-xs", routeStatusConfig[route.status].className)}>
                    {routeStatusConfig[route.status].label}
                  </Badge>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded bg-muted/30">
                  <p className="text-lg font-bold text-foreground">{route.totalStops}</p>
                  <p className="text-xs text-muted-foreground">Stops</p>
                </div>
                <div className="p-2 rounded bg-success/10">
                  <p className="text-lg font-bold text-success">{route.completedStops}</p>
                  <p className="text-xs text-muted-foreground">Done</p>
                </div>
                <div className="p-2 rounded bg-muted/30">
                  <p className="text-lg font-bold text-foreground">{route.estimatedDuration}</p>
                  <p className="text-xs text-muted-foreground">Est.</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Route Details & Map Placeholder */}
        <div className="lg:col-span-2 space-y-4">
          {/* Map Placeholder */}
          <div className="rounded-xl border border-border bg-card card-shadow overflow-hidden">
            <div className="h-[300px] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-primary animate-pulse" />
                <div className="absolute top-1/3 left-1/2 w-3 h-3 rounded-full bg-success" />
                <div className="absolute top-1/2 left-1/3 w-3 h-3 rounded-full bg-primary animate-pulse" />
                <div className="absolute top-2/3 left-2/3 w-3 h-3 rounded-full bg-muted-foreground" />
                <div className="absolute top-3/4 left-1/4 w-3 h-3 rounded-full bg-muted-foreground" />
              </div>
              <div className="text-center z-10">
                <Navigation className="h-12 w-12 text-primary mx-auto mb-3 opacity-50" />
                <p className="text-lg font-medium text-foreground">Map View</p>
                <p className="text-sm text-muted-foreground">
                  Connect to mapping service for live routes
                </p>
              </div>
            </div>
          </div>

          {/* Stop List */}
          {activeRoute && (
            <div className="rounded-xl border border-border bg-card card-shadow p-5">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Route for {activeRoute.staffName}
              </h3>
              <div className="space-y-3">
                {activeRoute.stops.map((stop, index) => (
                  <div
                    key={stop.id}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-lg border-l-4 transition-all animate-fade-in",
                      stopStatusConfig[stop.status]
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Step Number */}
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold shrink-0",
                        stop.status === "completed"
                          ? "bg-success text-success-foreground"
                          : stop.status === "current"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {index + 1}
                    </div>

                    {/* Store Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{stop.storeName}</p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-0.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {stop.address}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {stop.estimatedTime}
                        </span>
                      </div>
                    </div>

                    {/* Orders */}
                    <div className="text-right shrink-0">
                      <p className="text-lg font-bold text-foreground">{stop.orders}</p>
                      <p className="text-xs text-muted-foreground">orders</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
