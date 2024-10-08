import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "./lib/mongodb"
import { findUserByEmail } from "./lib/user"
import bcrypt from "bcrypt"

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string }
        if (!email || !password) return null
        const user = await findUserByEmail(email)
        if (!user) return null
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) return null
        return { id: user._id.toString(), email: user.email, name: user.name }
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account && account.provider === "google") {
        const existingUser = user.email ? await findUserByEmail(user.email) : null
        if (existingUser) {
          // Link the Google account to the existing user
          await clientPromise.then(client => {
            const db = client.db("Next_Ecommerce")
            return db.collection("accounts").updateOne(
              { userId: existingUser._id },
              {
                $set: {
                  provider: account.provider,
                  type: account.type,
                  providerAccountId: account.providerAccountId,
                  access_token: account.access_token,
                  expires_at: account.expires_at,
                  refresh_token: account.refresh_token,
                  token_type: account.token_type,
                  scope: account.scope,
                  id_token: account.id_token,
                  session_state: account.session_state,
                }
              },
              { upsert: true }
            )
          })
          return true
        }
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id as string
      return session
    }
  },
})