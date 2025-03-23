import { AuthForm } from '@/components/kokonutui/auth-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function page() {
  return (
    <div className="flex items-center justify-center pt-10">
      <div className="w-full max-w-[450px]">
        <div className="relative w-full h-48 mb-4">
          <Image src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/to-the-moon-u5UJD9sRK8WkmaTY8HdEsNKjAQ9bjN.svg" alt="To the moon illustration" fill className="object-cover" />
        </div>
        <Card className="w-full border-0 shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-semibold tracking-tight text-black dark:text-white">Admin Login</CardTitle>
            <CardDescription className="text-neutral-600 dark:text-neutral-400">Enter your credentials to access the dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <AuthForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
