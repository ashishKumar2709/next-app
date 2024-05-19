"use client";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Session } from "next-auth";

const Profile = dynamic(() => import("@components/Profile"), {
  loading: () => <p>Loading...</p>,
});
const ownerProfileDesc = "Your own posts.";

const OwnerProfilePage: React.FC = () => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [postData, setPostData] = useState<any>([]);
  useEffect(() => {
    const getUserSession = async () => {
      const dataS = await getSession();
      setSession(dataS);
    };
    getUserSession();
  }, []);

  const handleEdit = (post: { _id: string }) => {
    router.push(`/update-post?postId=${post._id}`);
  };

  const handleDelete = async (post: { _id: string }) => {
    try {
      const hasConfirmed = confirm("Are you sure you want to delete the post?");
      if (hasConfirmed) {
        await fetch(`/api/postRoutes/${post._id}`, {
          method: "DELETE",
        });
      }
      const filteredPost = postData.filter(
        (postElement: any) => postElement._id !== post._id
      );
      setPostData(filteredPost);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchResponse = await fetch(`/api/userPosts/${session?.user?.id}`, {
        method: "GET",
      });
      const fetchedData = await fetchResponse.json();
      setPostData(fetchedData);
    };
    if(session?.user?.id){
      fetchPosts()
    }
  }, [session?.user?.id]);

  return (
    <div>
      <Profile
        profileType={"My"}
        desc={ownerProfileDesc}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        postData={postData}
      />
    </div>
  );
};

export default OwnerProfilePage;
