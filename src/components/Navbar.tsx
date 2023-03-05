import Link from "next/link";
import React from "react";
import { signIn } from "next-auth/react";

export const Navbar: React.FC = ({}) => {
  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 py-2">
      <Link href="/" className="text-2xl font-black tracking-wider lg:text-3xl">
        Dish Spotter
      </Link>
      <div className="hidden items-center gap-3 lg:flex">
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
