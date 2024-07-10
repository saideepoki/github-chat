import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import User, { UserDocument } from "@/models/User";
import { FaAviato } from "react-icons/fa";
import { dbConnect } from "./dbConnect";
import { NextAuthOptions } from "next-auth";


export const authOptions: NextAuthOptions = {
    providers: [
        Github({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        // Google({
        //     clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        // }),
    ],

    callbacks: {
        async signIn({ user, profile}) {
            await dbConnect();
            try {
            const {name, email, image} = user;
            const providerId = profile?.id ?? profile?.sub;
            console.log(name,email,image, providerId)
            const existingUser = await User.findOne({providerId})
            if(!existingUser) {
                const newUser = new User({
                    providerId,
                    username: name,
                    email,
                    avatarUrl: image,
                })
                await newUser.save();
            }
            return true;
        } catch(err) {
            console.error("Error signing in");
            return false;
        }
        },

        async jwt({token, user}) {
            return token;
        },

        async session({session, token}) {
            if(session) {
                console.log("true");
                session.user.id = token?.sub as string;
                session.user.name = token?.name;
                session.user.email = token?.email;
                session.user.image = token?.picture as string;
            }
            return session;
        }
    },

    pages: {
        signIn: '/sign-in'
    },

    secret: process.env.NEXTAUTH_SECRET as string

}