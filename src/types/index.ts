export interface UserProfile {
  id: string;
  username?: string;
  wallet_address?: string;
  total_xp: number;
  level: number;
  current_streak: number;
}

export interface WalletLinkPayload {
  userId: string;
  wallet: string;
  signature: string;
  nonce: string;
}
