import { prisma } from '@/lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { Role } from '@prisma/client'
import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import OktaProvider from 'next-auth/providers/okta'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    ...(process.env.AUTH_PROVIDER === 'github'
      ? [
          GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            authorization:
              'https://github.com/login/oauth/authorize?scope=read:user+user:email+read:org',
            userinfo: {
              url: 'https://api.github.com/user',
              async request({ client, tokens }) {
                // Get base profile
                // @ts-ignore
                const profile = await client.userinfo(tokens)

                // If user has email hidden, get their primary email from the GitHub API
                if (!profile.email) {
                  const emails = await (
                    await fetch('https://api.github.com/user/emails', {
                      headers: {
                        Authorization: `token ${tokens.access_token}`,
                      },
                    })
                  ).json()

                  if (emails?.length > 0) {
                    // Get primary email
                    profile.email = emails.find(
                      (email: any) => email.primary
                    )?.email
                    // And if for some reason it doesn't exist, just use the first
                    if (!profile.email) profile.email = emails[0].email
                  }
                }

                return profile
              },
            },
          }),
        ]
      : []),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (profile.notAllowed) {
        return false
      }

      return true
    },
    async session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role: user.role,
        },
      }
    },
  },
  pages: {
    signIn: '/sign-in',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      image?: string | null
      role: Role
    }
  }

  interface User {
    role: Role
  }
}