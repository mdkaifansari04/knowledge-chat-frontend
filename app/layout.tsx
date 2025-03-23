import Header from '@/components/shared/header';
import { ThemeProvider } from '@/components/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientProvider from './provider/clientProvider';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ChatbotMe',
  description: 'A personalized chatbot',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ClientProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <Header />
              {children}
              <Toaster position="bottom-right" reverseOrder={true} />
            </ThemeProvider>
          </ClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
