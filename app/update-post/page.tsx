"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import PostFormSkeleton from "@components/PostFormSkeleton";

const PostForm = dynamic(() => import("@components/PostForm"), {
  loading: () => <PostFormSkeleton/>,
});

const EditPostComponent:React.FC = () => {
  const router = useRouter();
  const search = useSearchParams();
  const postId = search.get("postId");
  const [currentPost, setCurrentPost] = useState({ text: "", tag: "" });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const getCurrentPost = async () => {
      const getCurentPostResponse = await fetch(`/api/postRoutes/${postId}`);
      const currentPost = await getCurentPostResponse.json();
      setCurrentPost({ text: currentPost.post, tag: currentPost.tag });
    };
    if (postId) {
      getCurrentPost();
    }
  }, [postId]);
  const handleEdit = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      const editPostResponse = await fetch(`/api/postRoutes/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          text: currentPost.text,
          tag: currentPost.tag,
        }),
      });
      if (editPostResponse.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isClient?<PostForm
        postType="Edit"
        post={currentPost}
        setPost={setCurrentPost}
        handleSubmit={handleEdit}
      />:null}
    </>
  );
};

const EditPost = () => {
  return (
    <Suspense>
      <EditPostComponent />
    </Suspense>
  );
};

export default EditPost;
