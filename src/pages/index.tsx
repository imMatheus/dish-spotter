import { type NextPage } from "next";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  return (
    <>
      <main>
        <h1>hej då</h1>
      </main>
    </>
  );
};

export default Home;
