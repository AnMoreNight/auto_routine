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
      title="ダッシュボード"
      subtitle="2024年12月17日 — 本日の買付概要"
    >
      {/* 統計行 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="本日の注文数"
          value={147}
          subtitle="本日"
          icon={ShoppingCart}
          trend={{ value: 12, positive: true }}
          variant="primary"
        />
        <StatCard
          title="訪問予定店舗"
          value={38}
          subtitle="5エリアにまたがる"
          icon={Store}
          variant="default"
        />
        <StatCard
          title="稼働中スタッフ"
          value={5}
          subtitle="6名中"
          icon={Users}
          variant="default"
        />
        <StatCard
          title="完了率"
          value="68%"
          subtitle="147件中101件"
          icon={CheckCircle}
          trend={{ value: 5, positive: true }}
          variant="success"
        />
      </div>

      {/* ステータス概要 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="割当待ち"
          value={23}
          icon={Clock}
          variant="warning"
        />
        <StatCard
          title="処理中"
          value={46}
          icon={ShoppingCart}
          variant="primary"
        />
        <StatCard
          title="失敗/問題あり"
          value={8}
          icon={XCircle}
          variant="destructive"
        />
      </div>

      {/* メインコンテンツグリッド */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 注文テーブル - 2列 */}
        <div className="lg:col-span-2">
          <OrdersTable />
        </div>

        {/* サイドバー - 1列 */}
        <div className="space-y-6">
          <CutoffTimer />
          <QuickActions />
          <StaffOverview />
        </div>
      </div>
    </MainLayout>
  );
}
