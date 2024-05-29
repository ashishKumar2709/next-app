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
  const [isSubmitting, setIsSubmitting] = useState(false);


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
      setIsSubmitting(true)
      const editPostResponse = await fetch(`/api/postRoutes/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          text: currentPost.text,
          tag: currentPost.tag,
        }),
      });
      if (editPostResponse.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false)
    }
  };
  return (
    <>
      {isClient?<PostForm
        postType="Edit"
        post={currentPost}
        setPost={setCurrentPost}
        handleSubmit={handleEdit}
        isSubmitting={isSubmitting}
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
