/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xYHqD5MkVkT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="sticky inset-x-0 top-0 z-50 backdrop-blur-lg  shadow-sm ">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link className="flex items-center" href="#">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">VoiceCode</span>
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              href="#"
            >
              Home
            </Link>
            <Link
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              href="#"
            >
              About
            </Link>
            <Link
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              href="#"
            >
              Services
            </Link>
            <Link
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              href="#"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button size="sm" variant="outline">
              Sign in
            </Button>
            <Button size="sm">Sign up</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
