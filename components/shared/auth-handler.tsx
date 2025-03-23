'use client';
import { accessTokenStorage } from '@/lib/token-interceptor';
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';

function AuthHandler() {
  const { isSignedIn } = useAuth();
  useEffect(() => {
    if (!isSignedIn) accessTokenStorage.delete();
  }, [isSignedIn]);
  return null;
}

export default AuthHandler;
