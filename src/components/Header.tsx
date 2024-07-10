"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import clsx from "clsx";

export default function Header({logoPresent} : {logoPresent: boolean}) {
  const { data: session } = useSession();
  return (
    <div className="flex justify-between items-center top-0 w-full bg-zinc-900 h-[3rem]">
      <div>
        <p className={clsx(
        `text-white ml-2 font-bold`,
        {
        'visible': logoPresent === true,
        'hidden': logoPresent === false
        }
        )}>RepoConnect</p>
        </div>
      {session ? (
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Avatar className="mr-3 cursor-pointer">
                <AvatarImage src={session.user?.image as string}/>
                <AvatarFallback>{session.user?.name}</AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className = "w-30 bg-zinc-950 text-white">
            <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuGroup>
                <DropdownMenuItem
                onClick={() => signOut({callbackUrl: "/"})}>
                    Logout
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
       </DropdownMenu>
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
