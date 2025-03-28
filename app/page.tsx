'use client';
import MainResponseSection from '@/components/shared/mainResponse';
import SessionProvider from './provider/sessionProvider';

export default function Home() {
  return (
    <SessionProvider>
      <div className="flex flex-col w-full h-[calc(100vh-4rem)] bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:bg-gradient-to-br  dark:from-black dark:via-zinc-800/40 dark:to-black">
        <div className="flex flex-1 overflow-hidden">
          <MainResponseSection isDivisionOption={false} />
        </div>
      </div>
    </SessionProvider>
  );
}
