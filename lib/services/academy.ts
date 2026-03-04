/**
 * Service Layer: Your UI calls this, this calls the Chain/CMS
 */
export class AcademyService {
  static async getCourseProgress(wallet: string, courseId: string) {
    // Logic to fetch PDA or LocalStorage
    console.log("Fetching progress for:", courseId);
    return { completed: 0, total: 10 };
  }

  static async syncXpOnChain(wallet: string, amount: number) {
    // Logic for Token-2022 minting/transfer
    console.log("Syncing XP to Chain...");
  }
}
