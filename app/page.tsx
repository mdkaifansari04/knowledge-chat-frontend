'use client';
import MainResponseSection from '@/components/shared/mainResponse';

export default function Home() {
  return (
    <div className="flex flex-col w-full h-[calc(100vh-4rem)] bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:bg-gradient-to-br dark:to-black dark:from-black dark:via-zinc-800/40">
      <div className="flex flex-1 overflow-hidden">
        <MainResponseSection isDivisionOption={false} />
      </div>
    </div>
  );
}
