import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          // Forces GitHub to always show account chooser — even if already logged in
          prompt: "consent",
          access_type: "online",
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          // Forces Google to always show account picker — even if already logged in
          prompt: "select_account",
          access_type: "online",
        }
      }
    })
  ],

  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "github" || account.provider === "google") {
        await connectDB()

        // Identity is always EMAIL — same email = same account regardless of provider
        let user = await User.findOne({ email: profile.email })

        if (!user) {
          // First time — create new user
          const defaultUsername =
            account.provider === "github"
              ? profile.login
              : profile.email.split("@")[0]

          const avatarUrl =
            account.provider === "github"
              ? profile.avatar_url
              : profile.picture

          await User.create({
            email: profile.email,
            username: defaultUsername,
            name: profile.name || defaultUsername,
            profilepic: avatarUrl,
          })
        }
        // Existing user with same email — just log them in, touch nothing
      }
      return true
    },

    async session({ session, token }) {
      await connectDB()
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