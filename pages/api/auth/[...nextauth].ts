import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

type Credentials =
  | {
      email: string;
      password: string;
    }
  | undefined;

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
    // Auth0Provider({
    //   //@ts-ignore
    //   clientId: process.env.AUTH0_CLIENT_ID,
    //   //@ts-ignore
    //   clientSecret: process.env.AUTH0_CLIENT_SECRET,
    //   issuer: process.env.AUTH0_ISSUER,
    // }),
    //! I use credentials because I want my login in a modal and this was the easiest to implement.
    //! Implementing 0Auth when I have a single user would also be silly.
    CredentialsProvider({
      name: 'Holidaze',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Enter your email' },
        password: { label: 'Password', type: 'password', placeholder: 'Enter your password' },
      },
      async authorize(credentials) {
        try {
          // This is to make typescript shut up
          const user = (inputValues: Credentials) => {
            // and to confirm the NextAuth API correctly received the input values before making the request.
            if (!inputValues?.email || !inputValues?.password) return null;
            return { email: inputValues.email, password: inputValues.password };
          };
          // console.log(user(credentials));
          if (!user(credentials)) return null;
          // Now typescript will believe these values exist and stop bickering.
          const { ...values } = user(credentials);

          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, {
            identifier: values.email,
            password: values.password,
          });
          if (!data) return null;
          return data;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  // Theme for backup login page, in case someone tries to go to /admin directly.
  theme: {
    colorScheme: 'light',
    brandColor: '#003355',
    logo: 'https://i.imgur.com/iSAhDFQ.png', // Apparently I can't use images from my public folder directly?
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },
  // JSON Web tokens are only used for sessions if the `strategy: 'jwt'` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: process.env.NEXTAUTH_SECRET,
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    // signIn: '/auth/signin', // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, user }) {
      // When user signs in, assign user data to token, to access with session object
      if (user) {
        token.jwt = user.jwt;
        token.id = user.user.id;
        token.name = user.user.username;
        token.email = user.user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.jwt = token.jwt;
      session.id = token.id;
      session.email = token.email;
      session.name = token.username;
      return session;
    },
  },
  debug: true,
});
