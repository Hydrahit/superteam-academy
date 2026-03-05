import nacl from 'tweetnacl';
import bs58 from 'bs58';

export class AuthService {
  /**
   * Verifies the Ed25519 signature from the Solana Wallet
   */
  static verifySignature(wallet: string, signature: string, nonce: string, userId: string): boolean {
    try {
      const message = `Link Wallet to Superteam Academy\nUID: ${userId}\nNonce: ${nonce}`;
      const encodedMessage = new TextEncoder().encode(message);
      
      const signatureUint8 = bs58.decode(signature);
      const publicKeyUint8 = bs58.decode(wallet);

      return nacl.sign.detached.verify(
        encodedMessage,
        signatureUint8,
        publicKeyUint8
      );
    } catch (error) {
      console.error("Signature Verification Error:", error);
      return false;
    }
  }
}
