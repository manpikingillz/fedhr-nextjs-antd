// import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth"
import axios from "@/utils/axios";
import Credentials from "next-auth/providers/credentials";
import { Session, User as AdapterUser } from 'next-auth'

interface CustomUser extends AdapterUser {
  permissions?: string[],
}

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        const { username, password } = credentials as any

        const response = await axios.post('auth/jwt/login/', {username: username, password: password})
        const token = response.data.token

        if (token) {
          axios.defaults.headers['Authorization'] = 'Bearer ' + token

          const response = await axios.get('auth/me')
          const user = response.data
          console.log('responseee: ', user)

          // Any object returned will be saved in `user` property of the JWT
          // id: string
          // name?: string | null
          // email?: string | null
          // image?: string | null
          return {
            name: 'Gilbert Twesigomwe',
            email: user.email
          }
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
        }
      }
    }),
  ],

  // callbacks: {
  //   async jwt(token: any, user: CustomUser) {
  //     if (user) {
  //       // This will run when a user logs in and it will add the customField to the token
  //       token.permissions = user?.permissions;
  //     }
  //     return token;
  //   },

  //   async session(session, user: CustomUser, token) {
  //     // Add property to session.user
  //     console.log('session: ', session.user)
  //     user.permissions = token?.permissions;
  //     return session;
  //   }
  // },

  // session: {
  //   strategy: "jwt"
  // },

  // pages: {
  //   signIn: "/login"
  // }
};
