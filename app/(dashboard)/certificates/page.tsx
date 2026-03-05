import { CertificateCard } from '@/src/components/gamification/CertificateCard';

export default function CertificatesPage() {
  const certs = [
    { title: "Solana_Core_Architect", issuedAt: "MAR 05, 2026", txHash: "3Q...zX" },
    { title: "Rust_Safety_Engineer", issuedAt: "FEB 20, 2026", txHash: "4A...kP" },
    { title: "Anchor_Masterclass", issuedAt: "JAN 15, 2026", txHash: "9M...wL" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 px-12">
      <header className="mb-12">
        <h1 className="text-5xl font-syne font-black text-white uppercase tracking-tighter italic">
          Soulbound_<span className="text-[#14F195]">Vault</span>
        </h1>
        <p className="text-neutral-500 font-mono text-xs uppercase mt-2 tracking-widest">Your On-Chain Legacy on Solana</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {certs.map((cert, idx) => (
          <CertificateCard key={idx} {...cert} />
        ))}
      </div>
    </div>
  );
}
