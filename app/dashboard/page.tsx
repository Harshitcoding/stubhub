'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "@/components/dashboard/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Post {
  id: number;
  heading: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const Page = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/dashboard');
        setPosts(response.data);
        setFilteredPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter(post => 
      post.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleReadMore = (userId: number) => {
    router.push(`/blog/${userId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-24 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 relative">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    {post.heading}
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3">{post.content}</p>
                  {post.updatedAt !== post.createdAt && (
                    <div className="mt-4 flex items-center text-xs text-gray-400">
                      <Clock className="mr-1 h-3 w-3" />
                      <span>Updated {formatDate(post.updatedAt)}</span>
                    </div>
                  )}
                  <div className="mt-4">
                    <Button
                      onClick={() => handleReadMore(post.id)}
                      className="w-full flex items-center justify-center"
                    >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="rounded-full bg-gray-100 p-3">
                <Clock className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-xl font-medium text-gray-600">
                {searchQuery ? "No matching posts found" : "No posts available"}
              </p>
              <p className="text-sm text-gray-500">
                {searchQuery ? "Try different search terms" : "Check back later for new content"}
              </p>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Page;