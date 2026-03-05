import { Providers } from '../src/components/Providers';
import './globals.css';
export const metadata = { title: 'Superteam Academy', description: 'Web3 LMS on Solana' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
