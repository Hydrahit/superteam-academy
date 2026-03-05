
import { useEffect, useState } from 'react';
import { supabase } from '@/infrastructure/supabase/client';

export function useSupabaseData(walletAddress: string) {
  const [data, setData] = useState({ xp: 0, streak: 0, rank: 0 });

  useEffect(() => {
    if (!walletAddress) return;

    const fetchRealData = async () => {
      // Calling existing Supabase RPCs as per SPEC
      const { data: rpcData, error } = await supabase.rpc('get_user_stats', { 
        user_wallet: walletAddress 
      });

      if (!error && rpcData) {
        setData({
          xp: rpcData.total_xp,
          streak: rpcData.current_streak,
          rank: rpcData.global_rank
        });
      }
    };

    fetchRealData();
  }, [walletAddress]);

  return data;
}
