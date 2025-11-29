import DashboardHeader from '../DashboardHeader';

export default function DashboardHeaderExample() {
  return (
    <DashboardHeader 
      totalAccounts={15} 
      isLoading={false} 
      onRefresh={() => console.log('Refresh clicked')} 
    />
  );
}
