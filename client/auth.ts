import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import Author from "../backend/models/author.model"; // Adjust path as needed
import dbConnect from "./lib/dbConnect"; // Utility for connecting to MongoDB

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect(); // Ensure DB connection
    
      const existingUser = await Author.findOne({ id: profile?.id });
      if (!existingUser ) {
        // Create new author in MongoDB
        await Author.create({
          id: profile?.id, 
          name: user?.name,
          username: profile?.login,
          email: user?.email,
          image: user?.image,
          bio: profile?.bio || "",
        });
      }
    
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        await dbConnect();
        const user = await Author.findOne({ id: profile?.id });

        if (user) {
          token.id = user.id.toString();
        }
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      if (token.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
});
