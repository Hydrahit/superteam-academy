#!/bin/bash

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo -e "${GREEN}╔══════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   🔧 Fixing lib/solana/nft.ts        ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════╝${NC}"
echo ""

echo -e "${BLUE}[1/2] Rewriting lib/solana/nft.ts...${NC}"

mkdir -p lib/solana
cat > lib/solana/nft.ts << 'EOF'
import {
  Metaplex,
  walletAdapterIdentity,
  irysStorage,
  toMetaplexFile,
} from '@metaplex-foundation/js';
import { WalletContextState } from '@solana/wallet-adapter-react';
import { CONNECTION } from './wallet';

export interface MintCertificateParams {
  wallet: WalletContextState;
  courseTitle: string;
  courseId: string;
  score: number;
  recipientWallet: string;
}

export interface MintCertificateResult {
  mintAddress: string;
  txSignature: string;
}

export async function mintCertificateNFT(
  params: MintCertificateParams
): Promise<MintCertificateResult> {
  const { wallet, courseTitle, courseId, score, recipientWallet } = params;

  if (!wallet.publicKey) {
    throw new Error('Wallet not connected');
  }

  const metaplex = Metaplex.make(CONNECTION)
    .use(walletAdapterIdentity(wallet))
    .use(
      irysStorage({
        address: 'https://devnet.irys.xyz',
        providerUrl: process.env.NEXT_PUBLIC_SOLANA_RPC!,
        timeout: 60000,
      })
    );

  const imageUrl = `${process.env.NEXTAUTH_URL}/api/og/certificate?course=${encodeURIComponent(
    courseTitle
  )}&wallet=${recipientWallet}&score=${score}&date=${new Date().toLocaleDateString()}`;

  // Upload metadata to Irys (Arweave)
  const { uri } = await metaplex.nfts().uploadMetadata({
    name: `Superteam Academy — ${courseTitle} Certificate`,
    symbol: 'STACERT',
    description: `Issued to ${recipientWallet} for completing ${courseTitle} with a score of ${score}%.`,
    image: imageUrl,
    attributes: [
      { trait_type: 'Course', value: courseTitle },
      { trait_type: 'Course ID', value: courseId },
      { trait_type: 'Score', value: score.toString() },
      { trait_type: 'Network', value: 'Solana Devnet' },
      { trait_type: 'Issued By', value: 'Superteam Brazil' },
      {
        trait_type: 'Completion Date',
        value: new Date().toISOString().split('T')[0],
      },
    ],
    properties: {
      category: 'certificate',
      files: [{ uri: imageUrl, type: 'image/png' }],
    },
  });

  // Mint the NFT
  const { nft } = await metaplex.nfts().create({
    uri,
    name: `Superteam Academy — ${courseTitle} Certificate`,
    symbol: 'STACERT',
    sellerFeeBasisPoints: 0,
    isMutable: false,
    tokenOwner: wallet.publicKey,
  });

  return {
    mintAddress: nft.address.toString(),
    txSignature: nft.response.signature,
  };
}
EOF

echo -e "${GREEN}  ✓ nft.ts rewritten (bundlrStorage → irysStorage)${NC}"

echo ""
echo -e "${BLUE}[2/2] Running build...${NC}"
npm run build

if [ $? -eq 0 ]; then
  echo ""
  echo -e "${GREEN}╔══════════════════════════════════════════════════╗${NC}"
  echo -e "${GREEN}║  ✅ Build successful!                            ║${NC}"
  echo -e "${GREEN}║  Run: npm run dev                                ║${NC}"
  echo -e "${GREEN}║  🌐 http://localhost:3000                        ║${NC}"
  echo -e "${GREEN}╚══════════════════════════════════════════════════╝${NC}"
else
  echo -e "\033[0;31m❌ Build failed — paste errors above!\033[0m"
fi
