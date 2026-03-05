export class HeliusIndexerService {
  private static HELIUS_RPC = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "";

  // Fetches all holders of the XP Token-2022 Mint
  static async getTopHolders(mintAddress: string) {
    try {
      const response = await fetch(this.HELIUS_RPC, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'my-id',
          method: 'getTokenAccounts',
          params: { mint: mintAddress, limit: 10, page: 1 }
        }),
      });
      const data = await response.json();
      return data.result.token_accounts.map((acc: any, index: number) => ({
        rank: index + 1,
        address: acc.owner,
        xp: acc.amount,
        level: Math.floor(Math.sqrt(acc.amount / 100)) || 1
      }));
    } catch (e) {
      console.error("Helius indexing failed, falling back to mock", e);
      return [];
    }
  }
}