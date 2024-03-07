import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [

    ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }