import { useState } from "react";
import { Search, MapPin, Clock, Star, Plus, Filter } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Store {
  id: string;
  name: string;
  address: string;
  district: string;
  category: string;
  operatingHours: string;
  distance: string;
  priority: number;
  ordersToday: number;
  status: "open" | "closed" | "unknown";
}

const mockStores: Store[] = [
  { id: "1", name: "Electronics Plaza Shibuya", address: "1-21-3 Jinnan, Shibuya-ku", district: "Shibuya", category: "Electronics", operatingHours: "10:00 - 21:00", distance: "2.3 km", priority: 1, ordersToday: 8, status: "open" },
  { id: "2", name: "Bic Camera Yurakucho", address: "1-11-1 Yurakucho, Chiyoda-ku", district: "Chiyoda", category: "Electronics", operatingHours: "10:00 - 22:00", distance: "4.1 km", priority: 2, ordersToday: 5, status: "open" },
  { id: "3", name: "Gourmet Market Ginza", address: "4-6-16 Ginza, Chuo-ku", district: "Ginza", category: "Food & Beverage", operatingHours: "09:00 - 20:00", distance: "3.8 km", priority: 1, ordersToday: 12, status: "open" },
  { id: "4", name: "Tech Hub Akihabara", address: "1-15-4 Sotokanda, Chiyoda-ku", district: "Akihabara", category: "Electronics", operatingHours: "11:00 - 20:00", distance: "5.2 km", priority: 3, ordersToday: 3, status: "open" },
  { id: "5", name: "Muji Shinjuku", address: "3-15-15 Shinjuku, Shinjuku-ku", district: "Shinjuku", category: "Home & Lifestyle", operatingHours: "10:00 - 21:00", distance: "3.0 km", priority: 2, ordersToday: 6, status: "open" },
  { id: "6", name: "Specialty Foods Daikanyama", address: "17-6 Sarugakucho, Shibuya-ku", district: "Daikanyama", category: "Food & Beverage", operatingHours: "10:00 - 19:00", distance: "2.8 km", priority: 2, ordersToday: 4, status: "open" },
  { id: "7", name: "Uniqlo Ginza", address: "5-7-7 Ginza, Chuo-ku", district: "Ginza", category: "Fashion", operatingHours: "11:00 - 21:00", distance: "4.0 km", priority: 1, ordersToday: 9, status: "open" },
  { id: "8", name: "Itoya Stationery", address: "2-7-15 Ginza, Chuo-ku", district: "Ginza", category: "Stationery", operatingHours: "10:00 - 20:00", distance: "3.9 km", priority: 3, ordersToday: 2, status: "closed" },
];

const categoryColors: Record<string, string> = {
  Electronics: "bg-blue-500/20 text-blue-400",
  "Food & Beverage": "bg-green-500/20 text-green-400",
  "Home & Lifestyle": "bg-purple-500/20 text-purple-400",
  Fashion: "bg-pink-500/20 text-pink-400",
  Stationery: "bg-amber-500/20 text-amber-400",
};

export default function Stores() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = [...new Set(mockStores.map((s) => s.category))];

  const filteredStores = mockStores.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || store.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout title="Store Directory" subtitle={`${mockStores.length} stores across Tokyo`}>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl border border-border bg-card p-4 card-shadow">
          <p className="text-sm text-muted-foreground">Total Stores</p>
          <p className="text-2xl font-bold text-foreground">{mockStores.length}</p>
        </div>
        <div className="rounded-xl border border-success/20 bg-success/10 p-4">
          <p className="text-sm text-muted-foreground">Open Now</p>
          <p className="text-2xl font-bold text-success">
            {mockStores.filter((s) => s.status === "open").length}
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/10 p-4">
          <p className="text-sm text-muted-foreground">To Visit Today</p>
          <p className="text-2xl font-bold text-primary">
            {mockStores.filter((s) => s.ordersToday > 0).length}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 card-shadow">
          <p className="text-sm text-muted-foreground">Total Orders</p>
          <p className="text-2xl font-bold text-foreground">
            {mockStores.reduce((acc, s) => acc + s.ordersToday, 0)}
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search stores by name or district..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 rounded-lg border border-border bg-secondary pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
          />
        </div>
        <div className="flex gap-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-10 rounded-lg border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Store
          </Button>
        </div>
      </div>

      {/* Store Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredStores.map((store, index) => (
          <div
            key={store.id}
            className="rounded-xl border border-border bg-card p-4 card-shadow hover:elevated-shadow transition-all duration-200 animate-slide-up"
            style={{ animationDelay: `${index * 30}ms` }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{store.name}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{store.district}</span>
                </div>
              </div>
              <Badge
                className={cn(
                  "shrink-0 ml-2",
                  store.status === "open"
                    ? "bg-success/20 text-success"
                    : "bg-destructive/20 text-destructive"
                )}
              >
                {store.status === "open" ? "Open" : "Closed"}
              </Badge>
            </div>

            {/* Category */}
            <Badge className={cn("mb-3", categoryColors[store.category] || "bg-secondary")}>
              {store.category}
            </Badge>

            {/* Details */}
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{store.operatingHours}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span>{store.distance} from office</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Star className="h-3.5 w-3.5" />
                <span>Priority: {store.priority}</span>
              </div>
            </div>

            {/* Orders Badge */}
            {store.ordersToday > 0 && (
              <div className="flex items-center justify-between p-2 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-sm text-primary font-medium">
                  {store.ordersToday} orders today
                </span>
                <Button variant="ghost" size="sm" className="h-7 text-primary hover:text-primary">
                  View
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
