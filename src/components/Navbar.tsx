import Link from "next/link";
import React from "react";
import { signIn } from "next-auth/react";

export const Navbar: React.FC = ({}) => {
  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between bg-white px-6 py-2">
      <Link href="/" className="text-3xl font-black tracking-wider">
        Dish Spotter
      </Link>
      <div className="flex items-center gap-3">
        <Link href="/restaurants">Restaurants</Link>
        <button
          className="rounded-md bg-primary px-4 py-0.5 text-white transition-opacity hover:opacity-80"
          onClick={() => {
            signIn().catch(() => {
              alert("Could not sign you in");
            });
          }}
        >
          Sign in
        </button>
      </div>
    </nav>
  );
};
