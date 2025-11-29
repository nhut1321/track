import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  isOnline: boolean;
}

export default function StatusBadge({ isOnline }: StatusBadgeProps) {
  return (
    <Badge 
      variant="outline"
      className={`gap-1.5 ${isOnline ? 'border-status-online/30 text-status-online' : 'border-status-offline/30 text-status-offline'}`}
      data-testid={`badge-status-${isOnline ? 'online' : 'offline'}`}
    >
      <span 
        className={`h-2 w-2 rounded-full ${isOnline ? 'bg-status-online animate-pulse' : 'bg-status-offline'}`} 
      />
      {isOnline ? 'Online' : 'Offline'}
    </Badge>
  );
}
