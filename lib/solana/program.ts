import { Program, AnchorProvider, Idl, setProvider } from '@coral-xyz/anchor';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { AnchorWallet } from '@solana/wallet-adapter-react';

export const PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_PROGRAM_ID || '11111111111111111111111111111111'
);

export const SOLANA_RPC =
  process.env.NEXT_PUBLIC_SOLANA_RPC || clusterApiUrl('devnet');

export function getProvider(wallet: AnchorWallet): AnchorProvider {
  const connection = new Connection(SOLANA_RPC, 'confirmed');
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: 'confirmed',
  });
  setProvider(provider);
  return provider;
}

export function getProgram(wallet: AnchorWallet, idl: Idl): Program {
  const provider = getProvider(wallet);
  return new Program(idl, PROGRAM_ID, provider);
}

export async function findCertificatePDA(
  studentWallet: PublicKey,
  courseSlug: string
): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from('certificate'),
      studentWallet.toBuffer(),
      Buffer.from(courseSlug),
    ],
    PROGRAM_ID
  );
}

export async function findStudentPDA(
  studentWallet: PublicKey
): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('student'), studentWallet.toBuffer()],
    PROGRAM_ID
  );
}

export async function findCoursePDA(
  courseSlug: string
): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('course'), Buffer.from(courseSlug)],
    PROGRAM_ID
  );
}
