import { useMemo } from 'react';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { PROGRAM_ID } from '@/lib/blockchain/anchor-client';

// Note: You need to import your actual IDL file here later
// import idl from '@/onchain-academy/target/idl/superteam_academy.json';

export function useProgram() {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const program = useMemo(() => {
    if (!wallet) return null;

    const provider = new AnchorProvider(connection, wallet, {
      preflightCommitment: 'confirmed',
    });

    // Replace {} with your actual IDL once compiled
    return new Program({} as any, PROGRAM_ID, provider);
  }, [connection, wallet]);

  return { program, wallet };
}
