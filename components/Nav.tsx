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
  getSession,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

const Nav: React.FC = () => {
  const router = useRouter();
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [session, setSession] = useState<Session|null>(null)
  useEffect(()=>{
    const getUserSession = async()=>{
      const dataS = await getSession()
      setSession(dataS)
    }
    getUserSession()
  },[])
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    const setProviderAtLogin = async () => {
      const providersResponse = await getProviders();
      setProviders(providersResponse);
    };
    setProviderAtLogin();
  }, []);
  const handleCreatePost = () => {
    router.push("/create-posts");
  };

  return (
    <nav className="flex justify-between w-full mb-6 pt-1 mr-2 p-2">
      <Link
        href={"/"}
        className="font-medium flex justify-center items-center gap-2"
        title="Home page"
        suppressHydrationWarning={true}
      >
        <Image
          src={"/Logo/logo.png"}
          alt="Logo image"
          width="50"
          height="50"
          className="rounded-full w-auto h-auto"
        />
        <p className="text-base">Learn & share</p>
      </Link>
      {isClient?<div>
        {session?.user ? (
          <div className="flex justify-center items-center gap-2">
            <button
              title="Create Posts"
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md transition ease-out duration-100 transform"
              onClick={handleCreatePost}
            >
              Create Post
            </button>
            <button
              title="Logout"
              className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md transition ease-out duration-100 transform"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </button>
            <Link
              href="/profile"
              title="View your profile"
              suppressHydrationWarning={true}
            >
              <Image
                src={session?.user?.image ?? "/userImage/userImage.jpg"}
                alt="user image"
                width="35"
                height="35"
                className="rounded-full w-auto h-auto"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers)?.map((provider: any) => (
                <button
                  key={provider?.name}
                  onClick={(e) => {
                    signIn(provider.id, { callbackUrl: '/' });
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md transition ease-out duration-100 transform"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>:null}
    </nav>
  );
};

export default Nav;
