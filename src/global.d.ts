declare module '*.css' {
  const content: { [className: string]: string };
  export = content;
  export default content;
}

// Next Auth Type Definitions
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      accessToken: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    role?: string;
    token?: string;
    userId?: string;
    userRole?: string;
    userToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
    accessToken: string;
  }
}
