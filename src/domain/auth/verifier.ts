
import nacl from 'tweetnacl';
import { PublicKey } from '@solana/web3.js';

export class WalletVerifier {
  static verify(message: string, signature: Uint8Array, publicKey: string): boolean {
    try {
      const pubKeyUint8 = new PublicKey(publicKey).toBytes();
      const messageUint8 = new TextEncoder().encode(message);
      return nacl.sign.detached.verify(messageUint8, signature, pubKeyUint8);
    } catch (e) {
      return false;
    }
  }
}
