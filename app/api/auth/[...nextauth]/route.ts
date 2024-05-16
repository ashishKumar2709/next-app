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
        const userExists = await UserModel.findOne({ email: profile?.email });
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
        const sessionUser = await UserModel.findOne({
          email: session?.user?.email
        });

        const userFromSession =  session.user as { 
          name?: string | null | undefined; 
          email?: string | null | undefined; 
          image?: string | null | undefined;
          id?: string;
        };
        userFromSession.id = sessionUser?._id.toString();
        return session;
    
    }
    
  },
});

export { handler as GET, handler as POST };
