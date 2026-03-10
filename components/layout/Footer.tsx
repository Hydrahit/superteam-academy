import Link from 'next/link';

const platformLinks = [
  { href: '/courses', label: 'Courses' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/admin', label: 'Admin' },
];

const communityLinks = [
  { href: 'https://twitter.com/SuperteamBR', label: 'Twitter/X @SuperteamBR', icon: '🐦' },
  { href: 'https://discord.gg/superteam', label: 'Discord Superteam Brazil', icon: '💬' },
  { href: 'https://github.com/superteam-academy', label: 'GitHub', icon: '🐙' },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#1A1A1A] bg-[#060606]">
      <div className="max-w-7xl mx-auto py-16 px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎓</span>
              <span className="font-display font-bold text-[#00C896] text-xl">
                Superteam Academy
              </span>
            </div>
            <p className="text-[#888888] text-sm leading-relaxed">
              A decentralized learning platform built on Solana for Superteam Brazil 🇧🇷
            </p>
            <p className="text-[#888888] text-sm mt-3">
              Built with ❤️ for the Solana ecosystem
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-display text-white font-semibold mb-4">Platform</h3>
            <div className="flex flex-col gap-2">
              {platformLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#888888] hover:text-[#00C896] text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-display text-white font-semibold mb-4">Community</h3>
            <div className="flex flex-col gap-2">
              {communityLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#888888] hover:text-[#00C896] text-sm flex items-center gap-2 transition-colors"
                >
                  <span>{link.icon}</span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-[#1A1A1A] pt-6 flex justify-between flex-wrap gap-4">
          <p className="text-[#888888] text-sm">
            &copy; 2026 Superteam Academy. All rights reserved.
          </p>
          <p className="text-[#888888] text-sm">
            Built on ◎ Solana &middot; Certificates are NFTs
          </p>
        </div>
      </div>
    </footer>
  );
}
