import StatusBadge from '../StatusBadge';

export default function StatusBadgeExample() {
  return (
    <div className="flex gap-4">
      <StatusBadge isOnline={true} />
      <StatusBadge isOnline={false} />
    </div>
  );
}
