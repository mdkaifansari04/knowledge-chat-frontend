'use client';

import Sidebar from '@/components/kokonutui/sidebar';
import TopNav from '@/components/kokonutui/top-nav';
import { accessTokenStorage } from '@/lib/token-storage';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';

const AuthWrapper = ({ children }: PropsWithChildren<{}>) => {
  const pathname = usePathname();
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    setIsAdminAuthenticated(accessTokenStorage.get() ? true : false);
  }, [pathname]);

  if (isAdminAuthenticated === null) return null;

  return (
    <div className="flex h-screen">
      {isAdminAuthenticated && <Sidebar />}
      <div className="flex flex-col flex-1 w-full">
        {isAdminAuthenticated && (
          <header className="h-16 border-b border-gray-200 dark:border-[#1F1F23]">
            <TopNav />
          </header>
        )}
        <main className="flex-1 overflow-auto p-6 bg-white dark:bg-[#0F0F12]">{children}</main>
      </div>
    </div>
  );
};

export default AuthWrapper;
