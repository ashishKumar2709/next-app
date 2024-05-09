"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
import { useRouter } from 'next/navigation'
 


const Nav = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  useEffect(() => {
    const setProviderAtLogin = async () => {
      const providersResponse = await getProviders();
      setProviders(providersResponse);
    };
    setProviderAtLogin();
  }, []);
  const handleCreatePost = ()=>{
    router.push('/create-posts')
  }

  return (
    <nav
      className="flex justify-between w-full mb-6 pt-1 mr-2 p-2"
    >
      <Link
        href={"/"}
        className="font-medium flex justify-center items-center gap-2"
        title="Home page"
      >
        <Image src={"/Logo/logo.png"} alt="Logo image" width="50" height="50"className="rounded-full"/>
        <p className="text-base">Learn & share</p>
      </Link>
      <div>
        {session?.user ? (
          <div
            className="flex justify-center items-center gap-2"
          >
            <button title="Create Posts" className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md transition ease-out duration-100 transform" onClick={handleCreatePost}>Create Post</button>
            <button title="Logout" className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md transition ease-out duration-100 transform" onClick={() => signOut({callbackUrl: "/"})}>Logout</button>
            <Link href="/profile" title="View your profile">
              <Image
                src={session?.user?.image ?? "/userImage/userImage.jpg"}
                alt="user image"
                width="35"
                height="35"
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  key={provider?.name}
                  onClick={() => signIn(provider.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md transition ease-out duration-100 transform" 
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;