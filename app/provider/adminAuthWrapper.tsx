'use client';

import Sidebar from '@/components/kokonutui/sidebar';
import TopNav from '@/components/kokonutui/top-nav';
import { accessTokenStorage } from '@/lib/token-interceptor';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';

const AuthWrapper = ({ children }: PropsWithChildren<{}>) => {
  const isAdminAuthenticated = accessTokenStorage.get();
  const pathname = usePathname();
  useEffect(() => {}, [pathname]);
  if (isAdminAuthenticated)
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1 w-full">
          <header className="h-16 border-b border-gray-200 dark:border-[#1F1F23]">
            <TopNav />
          </header>
          <main className="flex-1 overflow-auto p-6 bg-white dark:bg-[#0F0F12]">{children}</main>
        </div>
      </div>
    );

  return (
    <div className="flex h-screen">
      <main className="flex-1 overflow-auto p-6 bg-white dark:bg-[#0F0F12]">{children}</main>
    </div>
  );
};

export default AuthWrapper;
