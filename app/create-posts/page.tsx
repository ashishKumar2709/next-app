"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const PostForm = dynamic(() => import("@components/PostForm"), {
  loading: () => <p>Loading...</p>,
})

const CreatePosts:React.FC = () => {
  const router = useRouter();
  const {data:session}:any = useSession();
  const [post, setPost] = useState({ text: "", tag: "" });

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
