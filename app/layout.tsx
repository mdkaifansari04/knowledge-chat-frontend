import Header from '@/components/shared/header';
import { ThemeProvider } from '@/components/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientProvider from './provider';

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
            </ThemeProvider>
          </ClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
