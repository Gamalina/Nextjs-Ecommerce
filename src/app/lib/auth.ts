import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "./mongodb"
import { findUserByEmail } from "./user"
import bcrypt from "bcrypt"
import NextAuth from "next-auth"

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: "Next_Ecommerce"
  }),
  providers: [
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
    async signIn() {
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
    },
  },
})