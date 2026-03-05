import nacl from "tweetnacl";
import { PublicKey } from "@solana/web3.js";
import bs58 from "bs58";

export class Ed25519Verifier {
  /**
   * Cryptographically verifies a wallet signature against a backend-generated nonce.
   */
  static verifySignature(
    nonce: string,
    signature: Uint8Array,
    publicKeyString: string,
  ): boolean {
    try {
      const publicKey = new PublicKey(publicKeyString);
      const messageBytes = new TextEncoder().encode(nonce);
      return nacl.sign.detached.verify(
        messageBytes,
        signature,
        publicKey.toBytes(),
      );
    } catch (error) {
      console.error("Signature verification failed:", error);
      return false;
    }
  }

  /**
   * Formats the signature for Supabase RPC transmission
   */
  static encodeSignature(signature: Uint8Array): string {
    return bs58.encode(signature);
  }
}
