import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    jwt: string;
    user: {
      id: unknown;
      username?: string | null;
      email?: string | null;
      provider?: string;
      confirmed: boolean;
      blocked: boolean;
      createdAt: Date;
      updatedAt: Date;
    };
  }
}
