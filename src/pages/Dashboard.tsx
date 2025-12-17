import { ShoppingCart, Store, Users, CheckCircle, Clock, XCircle } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { OrdersTable } from "@/components/dashboard/OrdersTable";
import { StaffOverview } from "@/components/dashboard/StaffOverview";
import { CutoffTimer } from "@/components/dashboard/CutoffTimer";
import { QuickActions } from "@/components/dashboard/QuickActions";

export default function Dashboard() {
  return (
    <MainLayout
      title="Dashboard"
      subtitle="December 17, 2024 — Daily procurement overview"
    >
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Orders"
          value={147}
          subtitle="Today"
          icon={ShoppingCart}
          trend={{ value: 12, positive: true }}
          variant="primary"
        />
        <StatCard
          title="Stores to Visit"
          value={38}
          subtitle="Across 5 districts"
          icon={Store}
          variant="default"
        />
        <StatCard
          title="Active Staff"
          value={5}
          subtitle="of 6 assigned"
          icon={Users}
          variant="default"
        />
        <StatCard
          title="Completed"
          value="68%"
          subtitle="101 of 147 items"
          icon={CheckCircle}
          trend={{ value: 5, positive: true }}
          variant="success"
        />
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Pending Assignment"
          value={23}
          icon={Clock}
          variant="warning"
        />
        <StatCard
          title="In Progress"
          value={46}
          icon={ShoppingCart}
          variant="primary"
        />
        <StatCard
          title="Failed / Issues"
          value={8}
          icon={XCircle}
          variant="destructive"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders Table - 2 columns */}
        <div className="lg:col-span-2">
          <OrdersTable />
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          <CutoffTimer />
          <QuickActions />
          <StaffOverview />
        </div>
      </div>
    </MainLayout>
  );
}
