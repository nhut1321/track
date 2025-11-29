import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import StatusBadge from "./StatusBadge";
import TypeBadge from "./TypeBadge";
import { formatDistanceToNow } from "date-fns";
import { Package } from "lucide-react";

export interface InventoryAccount {
  id: number;
  username: string;
  type: string;
  legendaryFishBait: number;
  legendaryFruitChest: number;
  mythicalFruitChest: number;
  listClass: string;
  lastUpdated: string;
  isOnline: boolean;
}

interface InventoryTableProps {
  accounts: InventoryAccount[];
  isLoading: boolean;
}

export default function InventoryTable({ accounts, isLoading }: InventoryTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (accounts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center" data-testid="empty-state">
        <Package className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h3 className="text-xl font-semibold mb-2">No accounts tracked yet</h3>
        <p className="text-muted-foreground max-w-sm">
          Start tracking by adding your first account through the API endpoint
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-16">ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right font-mono">Fish Bait</TableHead>
            <TableHead className="text-right font-mono">Legendary Chest</TableHead>
            <TableHead className="text-right font-mono">Mythical Chest</TableHead>
            <TableHead className="text-right">Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account, index) => (
            <TableRow 
              key={account.id} 
              className={index % 2 === 0 ? '' : 'bg-muted/30'}
              data-testid={`row-account-${account.id}`}
            >
              <TableCell className="font-mono text-muted-foreground" data-testid={`text-id-${account.id}`}>
                {account.id}
              </TableCell>
              <TableCell className="font-medium" data-testid={`text-username-${account.id}`}>
                {account.username}
              </TableCell>
              <TableCell>
                <StatusBadge isOnline={account.isOnline} />
              </TableCell>
              <TableCell>
                <TypeBadge type={account.type} />
              </TableCell>
              <TableCell className="text-right font-mono" data-testid={`text-fishbait-${account.id}`}>
                {account.legendaryFishBait.toLocaleString()}
              </TableCell>
              <TableCell className="text-right font-mono" data-testid={`text-legendarychest-${account.id}`}>
                {account.legendaryFruitChest.toLocaleString()}
              </TableCell>
              <TableCell className="text-right font-mono" data-testid={`text-mythicalchest-${account.id}`}>
                {account.mythicalFruitChest.toLocaleString()}
              </TableCell>
              <TableCell className="text-right text-sm text-muted-foreground" data-testid={`text-updated-${account.id}`}>
                {formatDistanceToNow(new Date(account.lastUpdated), { addSuffix: true })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
