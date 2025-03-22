'use client';
import { SignIn } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import { dark, experimental__simple } from '@clerk/themes';
import { useEffect } from 'react';

export default function Page() {
  const { theme } = useTheme();
  return (
    <main className="w-full h-[calc(100vh-4rem)] flex justify-center items-center">
      <SignIn
        appearance={{
          baseTheme: theme === 'dark' ? dark : experimental__simple,
        }}
      />
    </main>
  );
}
