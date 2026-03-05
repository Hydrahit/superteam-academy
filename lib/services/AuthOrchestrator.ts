import nacl from 'tweetnacl';
import { Buffer } from 'buffer';

export class AuthOrchestrator {
  /**
   * Prevents Replay Attacks using Nonce-based Ed25519 verification.
   */
  static verifyWalletSignature(walletAddress: string, signature: string, nonce: string): boolean {
    try {
      const message = new TextEncoder().encode(`Superteam Academy Login: ${nonce}`);
      const signatureUint8 = Buffer.from(signature, 'hex');
      const publicKeyUint8 = Buffer.from(walletAddress, 'hex'); // Standard Ed25519

      return nacl.sign.detached.verify(message, signatureUint8, publicKeyUint8);
    } catch (e) {
      console.error("Auth verification error:", e);
      return false;
    }
  }
}