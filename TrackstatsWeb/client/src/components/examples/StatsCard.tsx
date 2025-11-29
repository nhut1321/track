import StatsCard from '../StatsCard';
import { Users } from 'lucide-react';

export default function StatsCardExample() {
  return <StatsCard title="Total Accounts" value={42} icon={Users} description="Active trackers" />;
}
