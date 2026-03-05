export class HeliusIndexerService {
  private static RPC = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com";

  static async getLeaderboard(mintAddress: string) {
    try {
      const response = await fetch(this.RPC, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'leaderboard-fetch',
          method: 'getTokenAccounts',
          params: { mint: mintAddress, limit: 10, page: 1 }
        }),
      });
      const data = await response.json();
      if (!data.result) return [];

      return data.result.token_accounts.map((acc: any, i: number) => ({
        rank: i + 1,
        address: acc.owner,
        xp: parseInt(acc.amount),
        level: Math.floor(Math.sqrt(parseInt(acc.amount) / 100)) || 1
      }));
    } catch (e) {
      console.error("Helius indexing error:", e);
      return [];
    }
  }
}