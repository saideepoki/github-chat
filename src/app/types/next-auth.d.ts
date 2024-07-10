import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {

    interface Profile {
        id?: string
    }
    interface Session {
        user: {
            id?: string
        } & DefaultSession["user"]
    }
}