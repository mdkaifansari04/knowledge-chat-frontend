'use client'; // Ensure it's a client component

import LoaderSection from '@/components/loader-section';
import { accessTokenStorage } from '@/lib/token-storage';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';

const AdminAuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    const checkAuth = async () => {
      const token = accessTokenStorage.get();
      if (!token) {
        setIsAuthenticated(false);
        router.push('/admin/login'); // Redirect to login if not authenticated
      }
      if (token && pathname == '/admin/login') {
        setIsAuthenticated(true);
        router.push('/chapters');
      }

      if (token) setIsAuthenticated(true);
    };

    checkAuth();
  }, [router, pathname]);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return <LoaderSection />;
  }

  if (!accessTokenStorage.get() && !isLoginPage) {
    return (
      <div className="w-full h-[calc(100vh-5rem)] flex justify-center items-center">
        <p>Redirecting...</p>
      </div>
    );
  }

  return <div>{children}</div>;
};

export const withAdminAuth = (Component: React.FC) => {
  return function WrappedComponent(props: any) {
    return (
      <AdminAuthProvider>
        <Component {...props} />
      </AdminAuthProvider>
    );
  };
};
