import { PublicKey } from '@solana/web3.js';

export class AccountLinkingService {
  /**
   * Spec: Users sign up with Wallet OR Google.
   * This service handles the mapping in your DB/CMS.
   */
  static async linkWalletToGoogle(googleId: string, walletAddress: string) {
    console.log(`Linking ${walletAddress} to Google account ${googleId}`);
    // API call to your backend/CMS to update the mapping
    return { success: true, linkedAt: new Date().toISOString() };
  }

  static isFullyLinked(authStage: string): boolean {
    return authStage === 'fully_linked';
  }
}
