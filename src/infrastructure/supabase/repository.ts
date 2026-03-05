
import { supabase } from './client';

export class SupabaseRepository {
  static async updateUserStats(wallet: string, xpGain: number) {
    const { data, error } = await supabase.rpc('increment_user_xp', {
      target_wallet: wallet,
      xp_to_add: xpGain
    });
    if (error) throw new Error(error.message);
    return data;
  }

  static async getLeaderboard() {
    const { data, error } = await supabase.rpc('get_global_leaderboard');
    if (error) throw new Error(error.message);
    return data;
  }
}
