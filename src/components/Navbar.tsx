import Link from "next/link";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import { Button } from "./Button";
import Image from "next/image";

export const Navbar: React.FC = ({}) => {
  const { data } = useSession();

  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 py-2">
      <Link
        href="/"
        className="text-lg font-black tracking-wider md:text-2xl lg:text-3xl"
      >
        Dish Spotter
      </Link>
      <Link href="/restaurants">Restaurants</Link>
      <div className="hidden items-center gap-3 lg:flex">
        {data ? (
          <div>
            <div className="relative h-8 w-8">
              <Image
                alt={`${data.user.name || ""} profile image`}
                src={data.user.image || ""}
                className="rounded-full"
                fill={true}
              />
            </div>
          </div>
        ) : (
          <>
            <Button
              onClick={() => {
                signIn().catch(() => {
                  alert("Could not sign you in");
                });
              }}
            >
              Sign in
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                signIn().catch(() => {
                  alert("Could not sign you in");
                });
              }}
            >
              Sign up
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};
