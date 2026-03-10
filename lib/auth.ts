import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PublicKey } from '@solana/web3.js';
import nacl from 'tweetnacl';
import bs58 from 'bs58';
import { prisma } from './prisma';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Solana',
      credentials: {
        message: { label: 'Message', type: 'text' },
        signature: { label: 'Signature', type: 'text' },
        publicKey: { label: 'Public Key', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.message || !credentials?.signature || !credentials?.publicKey) {
          throw new Error('Missing credentials');
        }

        try {
          const publicKey = new PublicKey(credentials.publicKey);
          const message = new TextEncoder().encode(credentials.message);
          const signature = bs58.decode(credentials.signature);

          const isValid = nacl.sign.detached.verify(
            message,
            signature,
            publicKey.toBytes()
          );

          if (!isValid) {
            throw new Error('Invalid signature');
          }

          // Upsert user
          const user = await prisma.user.upsert({
            where: { walletAddress: credentials.publicKey },
            update: {},
            create: { walletAddress: credentials.publicKey },
          });

          return {
            id: user.id,
            name: user.walletAddress,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
        (session.user as any).walletAddress = token.name;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.name = user.name;
      }
      return token;
    },
  },
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export function isAdmin(walletAddress: string | null | undefined): boolean {
  if (!walletAddress) return false;
  const adminWallet = process.env.ADMIN_WALLET_ADDRESS;
  if (!adminWallet) return false;
  return walletAddress.toLowerCase() === adminWallet.toLowerCase();
}
