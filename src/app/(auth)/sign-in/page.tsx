"use client"

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function Page() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-zinc-950">
            <div className="mb-9">
                <div className="flex flex-col justify-center items-center text-white">
                    <h2 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl">Create an account</h2>
                    <p className="mt-2 font-light text-sm sm:text-base lg:text-lg text-gray-300">Sign in with Google or GitHub</p>
                </div>
                <div className="flex flex-col justify-center items-center space-y-3 mt-5">
                    <Button 
                        className="flex items-center space-x-2 w-64 bg-white hover:bg-slate-200 text-zinc-950 sm:w-72 lg:w-80"
                        onClick={() => signIn('google')}>
                        <FcGoogle size={20} />
                        <span className="text-sm sm:text-base lg:text-md">Google</span>
                    </Button>
                    <Button 
                        className="flex items-center space-x-2 w-64 sm:w-72 lg:w-80"
                        onClick={() => signIn("github")}>
                        <FaGithub size={20} />
                        <span className="text-sm sm:text-base lg:text-md">GitHub</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
