import Link from "next/link";
import React from "react";

export const Navbar: React.FC = ({}) => {
  return (
    <nav className="flex items-center justify-between px-10 py-2">
      <Link href="/" className="text-3xl font-black tracking-wider">
        Dish Spotter
      </Link>
      <div className="flex items-center gap-3">
        <Link href="/sad">Home</Link>
      </div>
    </nav>
  );
};
