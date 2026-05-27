"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Dashboard from '@/components/Dashboard'

const DashboardPage= () => {
  const { data: session } = useSession()
  const router = useRouter()          // ✅ hook at top level

  useEffect(() => {                   // ✅ redirect inside useEffect
    if (!session) {
      router.push('/login')
    }
  }, [session])

  return (
    <Dashboard/>
  )
}
export default DashboardPage

