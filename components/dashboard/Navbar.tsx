import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between w-full px-10 py-4 bg-purple-600">
      <div>
        <Link href="/">
          <Image
            src="/stubhub.png"
            alt="logo"
            height={100}
            width={100}
            className="bg-black"
          />
        </Link>
      </div>
      <div className="text-2xl font-bold flex items-center gap-4">
        <Link
          href="/new"
          className="px-2 py-1 bg-white text-purple-600 font-semibold rounded-lg shadow-md transition duration-300 hover:bg-purple-700 hover:text-white hover:shadow-lg active:scale-95"
        >
          Post
        </Link>
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
