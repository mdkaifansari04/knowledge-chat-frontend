import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import ClientProvider from './provider';
import Header from '@/components/shared/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ChatbotMe',
  description: 'A personalized chatbot',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
