import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hair Style Memory Quiz',
  description: 'Test your memory with hairstyle matching games',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
