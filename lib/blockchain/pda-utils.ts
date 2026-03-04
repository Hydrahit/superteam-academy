import { PublicKey } from '@solana/web3.js';
import { PROGRAM_ID } from './anchor-client';

export const getEnrollmentPda = (user: PublicKey, courseId: string) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("enrollment"), user.toBuffer(), Buffer.from(courseId)],
    PROGRAM_ID
  )[0];
};

export const getAchievementPda = (user: PublicKey, achievementId: string) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("achievement"), user.toBuffer(), Buffer.from(achievementId)],
    PROGRAM_ID
  )[0];
};
