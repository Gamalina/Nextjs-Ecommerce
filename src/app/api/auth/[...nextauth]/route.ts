import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '../../../lib/mongoose';
import User from '../../../models/User';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb'; // To properly type ObjectId

// Define the User interface to match your MongoDB model
interface IUser {
  _id: ObjectId;
  email: string;
  password: string;
}

const authOptions = NextAuth( {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectToDatabase();

        // Find the user by email
        const user = await User.findOne({ email: credentials?.email }) as IUser;

        if (!user) {
          console.log('No user found with the entered email');
          throw new Error('No user found with the entered email');
        }

        // Check if the password is correct
        if (!credentials?.password) {
          console.log('Password is required');
          throw new Error('Password is required');
        }
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);

        if (!isValidPassword) {
          console.log('password is incorrect');
          throw new Error('Password is incorrect');
        }

        // Return the user object (with id properly typed)
        return {
          id: user._id.toString(), // Convert ObjectId to string for consistency
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      // Pass the user info to the session object
      session.user = token.user as { id: string; name: string; email: string };
      return session;
    },
    async jwt({ token, user }: { token: any; user?: any }) {
      // Add user info to the JWT token on login
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { authOptions as GET, authOptions as POST };