'use client';
import MainResponseSection from '@/components/shared/mainResponse';

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <div className="flex flex-1 overflow-hidden">
        <MainResponseSection isDivisionOption={false} />
      </div>
    </div>
  );
}
