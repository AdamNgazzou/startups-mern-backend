import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
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
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const apiUrl = `${baseUrl}/api/authors/user/${profile?.id}`;
        console.log("Checking if user exists:", apiUrl);
        const rawexistingUser = await fetch(apiUrl);
        const existingUser = await rawexistingUser.json();

        if (existingUser.length === 0) {
          console.log("User does not exist, creating new user");
          // Create new author in MongoDB
          const response = await fetch(`${baseUrl}/api/authors`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: profile?.id,
              name: user?.name,
              username: profile?.login,
              email: user?.email,
              image: user?.image,
              bio: profile?.bio || "Empty bio", // Ensure bio is always included
              github_id: profile?.id,
            }),
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error("Failed to create new user:", errorText);
            throw new Error("Failed to create new user");
          }

          const responseRaw = await response.json();
          console.log("New user created", responseRaw);
        } else {
          console.log("User already exists");
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        await dbConnect();
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const apiUrl = `${baseUrl}/api/authors/user/${profile?.id}`;
        console.log("Fetching user in jwt callback:", apiUrl);
        const rawexistingUser = await fetch(apiUrl);
        const user = await rawexistingUser.json();

        if (user.length > 0) {
          token.id = user[0].id.toString();
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