import React from "react"
import PaymentPage from "@/components/PaymentPage"
import { fetchuser } from "@/actions/useractions"
import { notFound } from "next/navigation"

const Username = async ({ params }) => {
  const { username } = await params

// ✅ check if user exists in database
  const user = await fetchuser(username)

  // ✅ if not found, show 404 page
  if (!user) {
    notFound()
  }  
  return (
    <>
      <PaymentPage username={username} />
    </>
  )
}

export default Username

