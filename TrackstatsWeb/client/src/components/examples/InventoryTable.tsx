import InventoryTable, { InventoryAccount } from '../InventoryTable';

const mockAccounts: InventoryAccount[] = [
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
];

export default function InventoryTableExample() {
  return <InventoryTable accounts={mockAccounts} isLoading={false} />;
}
