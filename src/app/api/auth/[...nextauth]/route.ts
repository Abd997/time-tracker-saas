import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../../../../lib/prisma";
import { session } from "@/lib/auth";

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        })
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (!profile?.email) return false
            const user = await prisma.user.upsert({
                where: {
                    email: profile.email
                },
                create: {
                    email: profile.email,
                    name: profile?.name,
                    tenant: {
                        create: {
                            name: "google"
                        }
                    }
                },
                update: {
                    name: profile?.name
                }
            })

            return true
        },
        session: session,
        async jwt({ token, account, profile }) {
            if (account) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: profile?.email
                    }
                })
                if (!user)
                    throw new Error('User not found')

                token.id = account.userId
                token.tenant = {
                    id: user.tenantId
                }
            }
            return token
        },
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
