import Header from '@/components/shared/header';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { ClerkProvider } from '@clerk/nextjs';
import { Poppins } from 'next/font/google';
import './globals.css';
import ClientProvider from './provider/clientProvider';

const poppin = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });

export const metadata = {
  title: 'Knowledge Chat',
  description: 'A personalized chatbot',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={poppin.className}>
          <ClientProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <Header />
              {children}
              <Toaster />
            </ThemeProvider>
          </ClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
