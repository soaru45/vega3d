import type { Metadata } from 'next';
import { ThemeProvider } from '@/shared/providers/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vega 3D - AI Generation',
  description: 'AI Powered 3D Asset Generation Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
