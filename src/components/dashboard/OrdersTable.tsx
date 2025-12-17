import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Order {
  id: string;
  sku: string;
  productName: string;
  quantity: number;
  store: string;
  assignedTo: string;
  status: "pending" | "assigned" | "purchased" | "failed";
  orderDate: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    sku: "SKU-12345",
    productName: "Premium Wireless Headphones",
    quantity: 2,
    store: "Electronics Plaza",
    assignedTo: "Tanaka",
    status: "assigned",
    orderDate: "2024-01-15",
  },
  {
    id: "ORD-002",
    sku: "SKU-67890",
    productName: "Organic Green Tea Set",
    quantity: 5,
    store: "Gourmet Market",
    assignedTo: "Suzuki",
    status: "pending",
    orderDate: "2024-01-15",
  },
  {
    id: "ORD-003",
    sku: "SKU-11111",
    productName: "Portable Charger 20000mAh",
    quantity: 3,
    store: "Tech Hub",
    assignedTo: "Yamamoto",
    status: "purchased",
    orderDate: "2024-01-15",
  },
  {
    id: "ORD-004",
    sku: "SKU-22222",
    productName: "Artisan Coffee Beans 1kg",
    quantity: 4,
    store: "Specialty Foods",
    assignedTo: "Watanabe",
    status: "failed",
    orderDate: "2024-01-15",
  },
  {
    id: "ORD-005",
    sku: "SKU-33333",
    productName: "Bamboo Desk Organizer",
    quantity: 1,
    store: "Home Goods Plus",
    assignedTo: "Ito",
    status: "assigned",
    orderDate: "2024-01-15",
  },
];

const statusConfig = {
  pending: { label: "Pending", className: "bg-muted text-muted-foreground" },
  assigned: { label: "Assigned", className: "bg-primary/20 text-primary" },
  purchased: { label: "Purchased", className: "bg-success/20 text-success" },
  failed: { label: "Failed", className: "bg-destructive/20 text-destructive" },
};

export function OrdersTable() {
  return (
    <div className="rounded-xl border border-border bg-card card-shadow overflow-hidden">
      <div className="border-b border-border px-6 py-4">
        <h3 className="text-lg font-semibold text-foreground">Today's Orders</h3>
        <p className="text-sm text-muted-foreground">
          {mockOrders.length} orders to process
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Order ID
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
                Staff
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockOrders.map((order, index) => (
              <tr
                key={order.id}
                className="hover:bg-muted/20 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-mono text-sm text-primary">
                    {order.id}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-foreground truncate max-w-[200px]">
                      {order.productName}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {order.sku}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-foreground">{order.quantity}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-foreground">{order.store}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-foreground">{order.assignedTo}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge
                    className={cn(
                      "border-none font-medium",
                      statusConfig[order.status].className
                    )}
                  >
                    {statusConfig[order.status].label}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
