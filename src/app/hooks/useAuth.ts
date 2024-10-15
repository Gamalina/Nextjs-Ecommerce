import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

export const useAuth = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return // Do nothing while loading
    if (!session) router.push("/login") // Redirect to login if not authenticated
  }, [session, status, router])

  return {session, status}
}