import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "../../../../utils/database";
import User from "../../../../models/user";





const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    async session({ session }) {
        const sessionUser = await User.findOne({
            email: session.user.email,
        });

        session.user.id = sessionUser._id.toString(); // Convert ObjectId to string
        return session; // Return the updated session object
    },
    async signIn({ profile }) {
        // Every Next Js route is a serverless route
        try{
            await connectToDB(); // Connect to the database

            // Check if a user already exists in the database
            const userExists = await User.findOne({
                email: profile.email,
            });

            // If not, create a new user in the database
            if(!userExists){
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(" ", "").toLowerCase(),
                    image: profile.picture,
                })
             // If user exists, return true to allow sign in
             return true
            }
        }
        catch (error) {
            console.log("Error in signIn", error);
            return false;
        }
    }
})

export { handler as GET, handler as POST}