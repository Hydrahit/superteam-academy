export interface Certificate {
  id: string;
  name: string;
  description: string;
  minLevel: number;
  image: string;
  isMinted: boolean;
}

export const CERTIFICATES: Certificate[] = [
  { id: '1', name: 'Solana_Architect_V1', description: 'Mastered the Core Fundamentals of SVM.', minLevel: 1, image: '🏆', isMinted: true },
  { id: '2', name: 'Anchor_Grandmaster', description: 'Built and deployed secure smart contracts.', minLevel: 5, image: '🛡️', isMinted: false },
  { id: '3', name: 'DeFi_Orchestrator', description: 'Architected a liquidity protocol on Devnet.', minLevel: 10, image: '🧪', isMinted: false },
];