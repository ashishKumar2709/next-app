import UserModel from "@models/user";
import { connectToDB } from "@utils/database";
import NextAuth, { DefaultSession, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const clientId = process.env.CLIENT_ID!;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;

if (!clientId || !clientSecret) {
  throw new Error("Missing Google client ID or secret");
}

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET!,
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials}:any) {
      try {
        await connectToDB();
        //check if user exists
        const userExists = await UserModel.findOne({ email: profile.email });
        //create new user
        if (!userExists) {
          await UserModel.create({
            email: profile?.email,
            userName: profile?.name?.replace(" ", "").toLowerCase(),
            image: profile?.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session({ session }): Promise<Session | DefaultSession> {

      try {
        await connectToDB();
        const sessionUser = await UserModel.findOne({ email: session?.user?.email });
        session.user.id = sessionUser._id.toString();
          return session;
      } catch (error) {
        console.log("Error in session callback:", error);
        return session;
      }
 
    
    }
    
  },
});

export { handler as GET, handler as POST };
