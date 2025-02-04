"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import Navbar from "@/components/dashboard/Navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, Clock, ArrowRight, Search, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Post {
  id: number
  heading: string
  content: string
  createdAt: string
  updatedAt: string
}

const Page = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/dashboard")
        setPosts(response.data)
        setFilteredPosts(response.data)
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  useEffect(() => {
    const filtered = posts.filter(
      (post) =>
        post.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredPosts(filtered)
  }, [searchQuery, posts])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleReadMore = (userId: number) => {
    router.push(`/blog/${userId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden bg-white/10 backdrop-blur-lg border-0 shadow-lg">
                <CardHeader className="space-y-2">
                  <Skeleton className="h-6 w-2/3 bg-white/20" />
                  <Skeleton className="h-4 w-1/2 bg-white/20" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-32 w-full bg-white/20" />
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 relative">
          <div className="relative max-w-2xl mx-auto">
            <Input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 w-full bg-white/10 backdrop-blur-md border-0 text-white placeholder-white/60 rounded-full focus:ring-2 focus:ring-purple-400 transition-all duration-300"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" />
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden bg-white/10 backdrop-blur-lg border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                    {post.heading}
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-white/70">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 line-clamp-3">{post.content}</p>
                  {post.updatedAt !== post.createdAt && (
                    <div className="mt-4 flex items-center text-xs text-white/50">
                      <Clock className="mr-1 h-3 w-3" />
                      <span>Updated {formatDate(post.updatedAt)}</span>
                    </div>
                  )}
                  <div className="mt-6">
                    <Button
                      onClick={() => handleReadMore(post.id)}
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-full transition-all duration-300 flex items-center justify-center group"
                    >
                      <span className="group-hover:mr-2 transition-all duration-300">Read More</span>
                      <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center bg-white/10 backdrop-blur-lg border-0 shadow-lg">
            <div className="flex flex-col items-center space-y-6">
              <div className="rounded-full bg-purple-500/20 p-4">
                <Sparkles className="h-12 w-12 text-purple-300" />
              </div>
              <p className="text-3xl font-bold text-white">
                {searchQuery ? "No matching posts found" : "No posts available"}
              </p>
              <p className="text-lg text-white/70">
                {searchQuery ? "Try different search terms" : "Check back later for new content"}
              </p>
            </div>
          </Card>
        )}
      </main>
    </div>
  )
}

export default Page

