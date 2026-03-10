import {
  Metaplex,
  walletAdapterIdentity,
  irysStorage,
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
  });

  // response is on the result, not on nft
  const result = await metaplex.nfts().create({
    uri,
    name: `Superteam Academy — ${courseTitle} Certificate`,
    symbol: 'STACERT',
    sellerFeeBasisPoints: 0,
    isMutable: false,
    tokenOwner: wallet.publicKey,
  });

  return {
    mintAddress: result.nft.address.toString(),
    txSignature: result.response.signature,
  };
}
