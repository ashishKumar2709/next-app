"use client";
import React, { useState, useEffect } from "react";
import PostForm from "@components/PostForm";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const EditPostComponent = () => {
  const router = useRouter();
  const search = useSearchParams();
  const postId = search.get("postId");
  const [currentPost, setCurrentPost] = useState({ text: "", tag: "" });
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
      const response = await fetch(`/api/postRoutes/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          text: currentPost.text,
          tag: currentPost.tag,
        }),
      });
      const editPostResponse = await response.json();
      if (editPostResponse.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <PostForm
        postType="Edit"
        post={currentPost}
        setPost={setCurrentPost}
        handleSubmit={handleEdit}
      />
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
