import { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

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
        async signIn({ user, account, profile, email, credentials }) {
            console.log({ user, account, profile, email, credentials });
            return true;
        },
    },

    pages: {
        signIn: '/sign-in'
    }

}