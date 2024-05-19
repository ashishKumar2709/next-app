"use client";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import PostFormSkeleton from "@components/PostFormSkeleton";
import { Session } from "next-auth";

const PostForm = dynamic(() => import("@components/PostForm"), {
  loading: () => <PostFormSkeleton/>,
})

const CreatePosts:React.FC = () => {
  const router = useRouter();
  const [post, setPost] = useState({ text: "", tag: "" });
  const [session, setSession] = useState<Session|null>(null)
  useEffect(()=>{
    const getUserSession = async()=>{
      const dataS = await getSession()
      setSession(dataS)
    }
    getUserSession()
  },[])

  const handleSubmit = async(event:React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    try {
      const savePostResponse = await fetch('/api/postRoutes',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          text:post.text,
          tag: post.tag,
          userId: session?.user?.id
        })
      })
      if(savePostResponse.ok){
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <>
      <PostForm
        postType="Create"
        post={post}
        setPost={setPost}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default CreatePosts;
