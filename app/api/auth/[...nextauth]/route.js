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
        let user = await User.findOne({ email: profile.email })
        if (!user) {
          await User.create({
            email: profile.email,
            username: profile.login,
            name: profile.name || profile.login,
            profilepic: profile.avatar_url,
          })
        }
      }
      return true
    },              // ✅ comma between callbacks

    async session({ session, token }) {
      await connectDB()
      const dbUser = await User.findOne({ email: session.user.email })
      if (dbUser) {
        session.user.username = dbUser.username
        session.user.name = dbUser.name
      }
      return session
    }               // ✅ no comma on last callback

  }                 // ✅ closes callbacks
}                   // ✅ closes authOptions

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }