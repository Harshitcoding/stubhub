'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Page = () => {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  async function handleSubmit() {
    try {
      const response = await axios.post("/api/new", {
        heading,
        content,
      });

      console.log("Post created:", response.data);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 p-8">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create a New Post</h2>
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type="text"
          placeholder="Enter Post Heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />

        <textarea
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleSubmit}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Page;
