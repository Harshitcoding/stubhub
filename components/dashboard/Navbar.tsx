import { UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Sparkles } from "lucide-react"

const Navbar = () => {
  return (
    <div className="flex items-center justify-between w-full px-6 py-4 bg-gradient-to-r from-purple-800 to-indigo-900 backdrop-blur-lg shadow-lg">
      <div className="flex items-center space-x-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-12 h-12 overflow-hidden rounded-full bg-white/10 backdrop-blur-md">
            <Image src="/stubhub.png" alt="logo" layout="fill" objectFit="contain" className="p-2" />
          </div>
          <span className="text-2xl font-bold text-white hidden md:inline">StubHub</span>
        </Link>
      </div>
      <div className="flex items-center space-x-6">
        <Link
          href="/new"
          className="px-4 py-2 bg-purple-500 text-white font-semibold rounded-full shadow-md transition duration-300 hover:bg-purple-600 hover:shadow-lg active:scale-95 flex items-center space-x-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>New Post</span>
        </Link>
        <UserButton
          appearance={{
            elements: {
              avatarBox:
                "w-10 h-10 rounded-full border-2 border-purple-300 hover:border-white transition-colors duration-300",
            },
          }}
        />
      </div>
    </div>
  )
}

export default Navbar

