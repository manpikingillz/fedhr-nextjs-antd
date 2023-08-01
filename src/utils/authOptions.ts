import { NextAuthOptions } from "next-auth"
import axios from "@/utils/axios";
import Credentials from "next-auth/providers/credentials";

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
        const accessToken = response.data.token

        if (accessToken) {
          axios.defaults.headers['Authorization'] = 'Bearer ' + accessToken

          const response = await axios.get('auth/me')
          const user = response.data

          // Fields on original session.user object.
          // id: string
          // name?: string | null
          // email?: string | null
          // image?: string | null
  
          if (user) {
            return {
              id: user.id,
              name: user.full_name,
              email: user.email,
              permissions: user.permissions,
              accessToken: accessToken
            }
          }
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
        }
      }
    }),
  ],

  callbacks: {
    session: ({session, token}) => {
      // console.log('Log Session: ', {session, token})
     return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          accessToken: token.accessToken,
          permissions: token.permissions
        }
      }
    },

    jwt: ({token, user}) => {
      // console.log('Log JWT: ', {token, user})
      if (user) {
        // This will run when a user logs in and it will add the customField to the token
        const u = user as unknown as any
        return {
          ...token,
          id: u.id,
          permissions: u.permissions,
          accessToken: u.accessToken
        }
      }
      return token;
    },

    // redirect: async ({url, baseUrl}) => {
    //   console.log('url, baseURL :', url, baseUrl)
    //   if (url.includes('/api/auth/error')) {
    //     console.log('called error route')
    //     // If there was an error, stay on the same page (you could replace '/' with the path to your login page)
    //     return '/'
    //   }
  
    //   // if (url.startsWith(baseUrl)) {
    //   //   console.log('loggin base url')
    //   //   // If the url is a valid redirect (i.e., it's a url on your site), then just return it
    //   //   return url
    //   // }
      
    //   // If all else fails, redirect to the homepage
    //   return baseUrl
    // }
  },

  session: {
    strategy: "jwt"
  },

  pages: {
    signIn: "/login",
    error: "/login"
  }
};
