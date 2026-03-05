import './globals.css';
import { AppProviders } from '@/providers/AppProviders';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#060608]">
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
