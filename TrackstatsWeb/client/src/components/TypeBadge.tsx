import { Badge } from "@/components/ui/badge";

interface TypeBadgeProps {
  type: string;
}

export default function TypeBadge({ type }: TypeBadgeProps) {
  return (
    <Badge variant="secondary" data-testid={`badge-type-${type}`}>
      {type}
    </Badge>
  );
}
