export async function fetchGlobalLeaderboard() {
  const HELIUS_RPC = process.env.NEXT_PUBLIC_HELIUS_RPC || "https://api.devnet.solana.com";
  
  // Method: searchAssets to find all holders of the XP Token-2022 Mint
  console.log("🔍 Fetching XP holders from Helius DAS API...");
  
  // Stub for DAS Response
  return [
    { owner: "Om_Dubey", balance: 145000 },
    { owner: "Aastha_Dev", balance: 132000 },
    { owner: "Vishal_ECE", balance: 95000 }
  ];
}
