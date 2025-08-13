
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Mail, UserCheck, CalendarDays } from "lucide-react"

export default function ViewProfile() {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/team/${id}`, { withCredentials: true })
        setUser(data.data)
        setLoading(false)
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to load profile")
        setLoading(false)
      }
    }
    fetchUser()
  }, [id])

  if (loading) return <p className="text-center my-20 text-gray-500">Loading profile...</p>
  if (error) return <p className="text-center my-20 text-red-600">{error}</p>
  if (!user) return <p className="text-center my-20 text-gray-500">User not found.</p>

  return (
    <section className="max-w-xl mx-auto my-16 p-6">
      <Card className="p-8 flex flex-col items-center gap-8 border border-gray-100 shadow-sm bg-white rounded-xl">
        <Avatar className="w-32 h-32 hover:scale-105 transition-transform shadow-md rounded-full border border-gray-200">
          {user.avatar?.url ? (
            <AvatarImage src={user.avatar.url} alt={user.name} />
          ) : (
            <AvatarFallback className="bg-indigo-100 text-indigo-600 text-4xl font-bold">
              {user.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          )}
        </Avatar>

        <CardContent className="text-center space-y-4 px-0">
          <h1 className="text-3xl font-extrabold text-gray-900">{user.name}</h1>

          <p className="flex items-center justify-center text-gray-600 space-x-2">
            <Mail className="w-5 h-5 text-indigo-500" />
            <span>{user.email}</span>
          </p>

          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{user.bio || "No bio available."}</p>

          <p className="flex items-center justify-center space-x-2 text-gray-700">
            <UserCheck className="w-5 h-5 text-indigo-500" />
            <strong>Role:</strong>
            <span className="capitalize">{user.role}</span>
          </p>

          <p className="flex items-center justify-center space-x-2 text-gray-700">
            <CalendarDays className="w-5 h-5 text-indigo-500" />
            <strong>Joined:</strong>
            <time dateTime={user.createdAt}>
              {new Date(user.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </p>

          <Button
            variant="outline"
            className="mt-6 px-8"
            onClick={() => window.history.back()}
            aria-label="Go back"
          >
            Go Back
          </Button>
        </CardContent>
      </Card>
    </section>
  )
}
