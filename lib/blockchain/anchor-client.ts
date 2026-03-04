import { AnchorProvider, Program, Idl } from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";

// Replace with your actual Program ID from onchain-academy/
export const PROGRAM_ID = new PublicKey("ACADemy111111111111111111111111111111111111");

export const getProvider = (wallet: any) => {
  const connection = new Connection("https://api.devnet.solana.com", "confirmed");
  return new AnchorProvider(connection, wallet, { preflightCommitment: "confirmed" });
};

export const getProgram = (provider: AnchorProvider, idl: Idl) => {
  return new Program(idl, PROGRAM_ID, provider);
};
