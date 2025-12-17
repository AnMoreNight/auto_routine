import { useState } from "react";
import { Upload, Filter, Search, ChevronDown } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Order {
  id: string;
  sku: string;
  productName: string;
  quantity: number;
  store: string;
  assignedTo: string;
  status: "pending" | "assigned" | "purchased" | "failed" | "discontinued" | "restocking";
  orderDate: string;
  priority: "high" | "normal" | "low";
}

const mockOrders: Order[] = [
  { id: "ORD-001", sku: "SKU-12345", productName: "Premium Wireless Headphones Sony WH-1000XM5", quantity: 2, store: "Electronics Plaza Shibuya", assignedTo: "Tanaka", status: "assigned", orderDate: "2024-01-15", priority: "high" },
  { id: "ORD-002", sku: "SKU-67890", productName: "Organic Matcha Green Tea Set Premium", quantity: 5, store: "Gourmet Market Ginza", assignedTo: "Suzuki", status: "pending", orderDate: "2024-01-15", priority: "normal" },
  { id: "ORD-003", sku: "SKU-11111", productName: "Anker PowerCore 20000mAh Portable Charger", quantity: 3, store: "Tech Hub Akihabara", assignedTo: "Yamamoto", status: "purchased", orderDate: "2024-01-15", priority: "normal" },
  { id: "ORD-004", sku: "SKU-22222", productName: "Blue Bottle Single Origin Coffee Beans 1kg", quantity: 4, store: "Specialty Foods Daikanyama", assignedTo: "Watanabe", status: "failed", orderDate: "2024-01-15", priority: "low" },
  { id: "ORD-005", sku: "SKU-33333", productName: "Muji Bamboo Desk Organizer Large", quantity: 1, store: "Muji Shinjuku", assignedTo: "Ito", status: "assigned", orderDate: "2024-01-15", priority: "high" },
  { id: "ORD-006", sku: "SKU-44444", productName: "Nintendo Switch OLED Model White", quantity: 1, store: "Bic Camera Yurakucho", assignedTo: "", status: "pending", orderDate: "2024-01-15", priority: "high" },
  { id: "ORD-007", sku: "SKU-55555", productName: "Uniqlo Heattech Ultra Warm Set", quantity: 6, store: "Uniqlo Ginza", assignedTo: "Tanaka", status: "discontinued", orderDate: "2024-01-15", priority: "normal" },
  { id: "ORD-008", sku: "SKU-66666", productName: "Pilot Kakuno Fountain Pen Set", quantity: 10, store: "Itoya Stationery", assignedTo: "Suzuki", status: "restocking", orderDate: "2024-01-15", priority: "low" },
];

const statusConfig = {
  pending: { label: "Pending", className: "bg-muted text-muted-foreground" },
  assigned: { label: "Assigned", className: "bg-primary/20 text-primary" },
  purchased: { label: "Purchased", className: "bg-success/20 text-success" },
  failed: { label: "Failed", className: "bg-destructive/20 text-destructive" },
  discontinued: { label: "Discontinued", className: "bg-destructive/20 text-destructive" },
  restocking: { label: "Restocking", className: "bg-warning/20 text-warning" },
};

const priorityConfig = {
  high: "border-l-warning",
  normal: "border-l-primary",
  low: "border-l-muted-foreground",
};

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <MainLayout title="Orders" subtitle="Manage and track all purchase orders">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by product, SKU, or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 rounded-lg border border-border bg-secondary pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
          />
        </div>
        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-lg border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="assigned">Assigned</option>
            <option value="purchased">Purchased</option>
            <option value="failed">Failed</option>
            <option value="discontinued">Discontinued</option>
            <option value="restocking">Restocking</option>
          </select>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Import Orders
          </Button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-xl border border-border bg-card card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Qty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Store
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.map((order, index) => (
                <tr
                  key={order.id}
                  className={cn(
                    "hover:bg-muted/20 transition-colors border-l-4 animate-fade-in",
                    priorityConfig[order.priority]
                  )}
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-sm text-primary">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-foreground truncate max-w-[250px]">
                        {order.productName}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">{order.sku}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-foreground">{order.quantity}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground truncate max-w-[180px] block">
                      {order.store}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.assignedTo ? (
                      <span className="text-sm text-foreground">{order.assignedTo}</span>
                    ) : (
                      <span className="text-sm text-muted-foreground italic">Unassigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      className={cn("border-none font-medium", statusConfig[order.status].className)}
                    >
                      {statusConfig[order.status].label}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button variant="ghost" size="sm" className="gap-1">
                      Actions
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border px-6 py-4 bg-muted/20">
          <p className="text-sm text-muted-foreground">
            Showing {filteredOrders.length} of {mockOrders.length} orders
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
