import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'True AI — Discover. Source. Market. Sell.',
  description: 'The world\'s first AI platform that finds trending products, sources suppliers, creates viral content, and sells globally — all automatically.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#13131f',
              color: '#e8e8f0',
              border: '1px solid rgba(108,99,255,0.3)',
              borderRadius: '12px',
              fontSize: '14px',
            },
          }}
        />
      </body>
    </html>
  );
}
