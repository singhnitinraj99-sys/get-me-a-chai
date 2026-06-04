import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],

  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "github") {
        await connectDB()

        // Find user by EMAIL only — username changes are ignored for identity
        let user = await User.findOne({ email: profile.email })

        if (!user) {
          // First time login — create new user
          await User.create({
            email: profile.email,
            username: profile.login,
            name: profile.name || profile.login,
            profilepic: profile.avatar_url,
          })
        }
        // If user already exists with this email — do nothing, just let them in
        // username in DB stays whatever they last set in Dashboard
      }
      return true
    },

    async session({ session, token }) {
      await connectDB()
      // Always fetch fresh user data by email — source of truth
      const dbUser = await User.findOne({ email: session.user.email })
      if (dbUser) {
        session.user.username = dbUser.username
        session.user.name = dbUser.name
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }