import Sidebar from '@/components/layout/Sidebar';
import HeatmapClient from './HeatmapClient';
export default function HeatmapPage() {
  return (
    <div className="flex h-screen bg-surface-200 overflow-hidden">
      <Sidebar />
      <HeatmapClient />
    </div>
  );
}
