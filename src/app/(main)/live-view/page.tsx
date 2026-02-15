import { FootageGallery } from '@/components/sections/live-view/footage-gallery';
import { EmptyLiveMonitor } from '@/components/sections/live-view/empty-live-monitor';

export default function LiveView() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <EmptyLiveMonitor></EmptyLiveMonitor>
      <FootageGallery></FootageGallery>
    </div>
  );
}