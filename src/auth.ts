import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHub,
    Google,
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        const { name, email, image } = credentials;

        try {
          const res = await axios.post(
            `http://localhost:5000/api/v1/social-login`,
            { name, email, image },
            { withCredentials: true }
          );

          if (res.status === 200 && res.data) {
            return {
              id: res.data._id || res.data.id,
              name: res.data.name,
              email: res.data.email,
              image: res.data.image,
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      // This will run for Google/GitHub logins
      if (account?.provider !== 'credentials') {
        try {
          await axios.post(
            `http://localhost:5000/api/v1/social-login`,
            {
              name: user.name,
              email: user.email,
              image: user.image,
            },
            {
              withCredentials: true,
            }
          );
        } catch (error) {
          console.error('Error saving user during signIn callback:', error);
          return false; // block sign in if needed
        }
      }

      return true;
    },
  },

  pages: {
    signIn: '/login',
  },

  secret: process.env.NEXTAUTH_SECRET,
});
