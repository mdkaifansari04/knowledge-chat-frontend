'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdminLogin } from '@/hooks/mutation';
import { accessTokenStorage } from '@/lib/token-interceptor';
import { getErrorMessage } from '@/lib/utils';
import { Loader2, LockIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export function AuthForm() {
  const { mutate: login, isPending: isLoading } = useAdminLogin();
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    login(
      { username, password },
      {
        onSuccess: (response) => {
          toast.success('Login successfully.');
          accessTokenStorage.set(response.token);
          router.push('/admin/dashboard');
        },
        onError: (error: Error) => {
          toast.error(getErrorMessage(error));
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="space-y-2">
        <label htmlFor="username" className="text-sm font-medium text-black dark:text-white">
          Username
        </label>
        <div className="relative">
          <span className="absolute flex items-center justify-center w-4 h-4 text-gray-500 -translate-y-1/2 left-3 top-1/2">@</span>
          <Input type="email" name="username" placeholder="name@example.com" required disabled={isLoading} className="h-12 pl-10 bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring" autoComplete="email" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-black dark:text-white">Password</label>
        <div className="relative">
          <LockIcon className="absolute w-4 h-4 text-gray-500 -translate-y-1/2 left-3 top-1/2" />
          <Input type="password" name="password" placeholder="Enter your password" required disabled={isLoading} className="h-12 pl-10 bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring" />
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full h-12 text-base font-medium text-white transition-colors bg-black hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200">
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {isLoading ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  );
}
