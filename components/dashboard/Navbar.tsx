import { UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
  return (
    <div className="flex items-center justify-between w-full px-10 py-4 bg-purple-600 ">
      <div>
      <Link href={'/'}>
      <Image src={'/stubhub.png'} alt="logo" height={100} width={100} className="bg-black"/>
      </Link>
      </div>
      <div className="text-2xl font-bold items-center flex gap-2">
       <div>
       <Link href={'/new'}>
       Post
       </Link>
       </div>
        <div>
            <UserButton/>
       </div>
       
      </div>
    </div>
  )
}
export default Navbar