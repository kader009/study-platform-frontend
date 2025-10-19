import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import axios from 'axios';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://study-platform-backend-drxm.onrender.com/api/v1';

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      // This will run for Google/GitHub logins
      if (account?.provider === 'google' || account?.provider === 'github') {
        try {
          const response = await axios.post(
            `${API_URL}/social-login`,
            {
              name: user.name,
              email: user.email,
              photoUrl: user.image,
              provider: account.provider,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          if (response.data) {
            // Store user data in the user object to access in jwt callback
            user.userId = response.data.user?._id || response.data._id;
            user.userRole = response.data.user?.role || response.data.role;
            user.userToken = response.data.token;
          }

          return true;
        } catch (error) {
          console.error('Error saving user during signIn callback:', error);
          return false; // block sign in if error
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      // Add user data to token after sign in
      if (user) {
        token.id = user.userId || user.id;
        token.role = user.userRole || 'student';
        token.accessToken = user.userToken || '';
      }
      return token;
    },

    async session({ session, token }) {
      // Add token data to session
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
  },

  pages: {
    signIn: '/login',
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.AUTH_SECRET,
});
