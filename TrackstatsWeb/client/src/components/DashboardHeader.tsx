import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Activity } from "lucide-react";

interface DashboardHeaderProps {
  totalAccounts: number;
  isLoading: boolean;
  onRefresh: () => void;
}

export default function DashboardHeader({ totalAccounts, isLoading, onRefresh }: DashboardHeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Activity className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold" data-testid="text-dashboard-title">TrackStats</h1>
        </div>
        <Badge variant="outline" className="gap-1.5" data-testid="badge-live-status">
          <span className="h-2 w-2 rounded-full bg-status-online animate-pulse" />
          Live
        </Badge>
        <Badge variant="secondary" data-testid="badge-total-accounts">
          {totalAccounts} accounts
        </Badge>
      </div>
      <Button 
        variant="outline" 
        onClick={onRefresh}
        disabled={isLoading}
        data-testid="button-refresh"
      >
        <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
        Refresh
      </Button>
    </header>
  );
}
