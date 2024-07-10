"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";
export default function Header() {
  const { data: session } = useSession();
  return (
    <div className="flex justify-between items-center top-0 w-full bg-zinc-900 h-[3rem]">
      <div>
        <p className="text-white ml-2 font-bold">RepoConnect</p>
        </div>
      {session ? (
        <div className="mr-4">
          <Button
            className="bg-white hover:bg-slate-200 text-zinc-950"
            onClick={() => signOut()}
          >
            Sign out
          </Button>
        </div>
      ) : (
        <div className="mr-4">
          <Link href={"/sign-in"}>
            <Button className="bg-white hover:bg-slate-200 text-zinc-950">
              Sign in
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
