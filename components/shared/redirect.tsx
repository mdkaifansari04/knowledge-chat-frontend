'use client';

import { useRouter } from 'next/navigation';

function RedirectToPath({ path }: { path: string }) {
  const router = useRouter();
  router.replace(path);
  return null;
}

export default RedirectToPath;
