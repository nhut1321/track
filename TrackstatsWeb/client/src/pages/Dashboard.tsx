import { useState, useCallback } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import StatsCard from "@/components/StatsCard";
import InventoryTable, { InventoryAccount } from "@/components/InventoryTable";
import { Users, Wifi, Package } from "lucide-react";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  
  // todo: remove mock functionality - replace with real API call
  const [accounts] = useState<InventoryAccount[]>([
    {
      id: 1,
      username: "Player123",
      type: "treo bf",
      legendaryFishBait: 150,
      legendaryFruitChest: 25,
      mythicalFruitChest: 5,
      listClass: "-",
      lastUpdated: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      isOnline: true,
    },
    {
      id: 2,
      username: "GamerPro",
      type: "farming",
      legendaryFishBait: 320,
      legendaryFruitChest: 42,
      mythicalFruitChest: 12,
      listClass: "-",
      lastUpdated: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      isOnline: false,
    },
    {
      id: 3,
      username: "RobloxMaster",
      type: "treo bf",
      legendaryFishBait: 89,
      legendaryFruitChest: 15,
      mythicalFruitChest: 3,
      listClass: "-",
      lastUpdated: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
      isOnline: true,
    },
    {
      id: 4,
      username: "BloxFisher",
      type: "fishing",
      legendaryFishBait: 512,
      legendaryFruitChest: 8,
      mythicalFruitChest: 1,
      listClass: "-",
      lastUpdated: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      isOnline: false,
    },
    {
      id: 5,
      username: "ProTracker",
      type: "treo bf",
      legendaryFishBait: 245,
      legendaryFruitChest: 67,
      mythicalFruitChest: 22,
      listClass: "-",
      lastUpdated: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      isOnline: true,
    },
  ]);

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    // todo: remove mock functionality - replace with real API refresh
    setTimeout(() => {
      setIsLoading(false);
      console.log('Data refreshed');
    }, 1000);
  }, []);

  const onlineCount = accounts.filter(a => a.isOnline).length;
  const totalItems = accounts.reduce(
    (sum, a) => sum + a.legendaryFishBait + a.legendaryFruitChest + a.mythicalFruitChest,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <DashboardHeader 
          totalAccounts={accounts.length} 
          isLoading={isLoading} 
          onRefresh={handleRefresh} 
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <StatsCard
            title="Total Accounts"
            value={accounts.length}
            icon={Users}
            description="Tracked players"
          />
          <StatsCard
            title="Online Players"
            value={onlineCount}
            icon={Wifi}
            description={`${Math.round((onlineCount / accounts.length) * 100) || 0}% online`}
          />
          <StatsCard
            title="Total Items"
            value={totalItems}
            icon={Package}
            description="All inventories combined"
          />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4" data-testid="text-inventory-title">
            Inventory Overview
          </h2>
          <InventoryTable accounts={accounts} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
