"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
const Profile = dynamic(() => import("@components/Profile"), {
  loading: () => <p>Loading...</p>,
})

interface Params {
  params: {
    userId: string;
  };
}
const UserProfilePage: React.FC<Params> = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("userName");
  const userProfileDesc = `You are viewing posts by ${userName}`;
  const [postData, setPostData] = useState<any>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchResponse = await fetch(`/api/userPosts/${params.userId}`, {
        method: "GET",
      });
      const fetchedData = await fetchResponse.json();
      setPostData(fetchedData);
    };
    if (params.userId) fetchPosts();
  }, [params.userId]);

  return (
    <div>
      <Profile
        profileType={`${userName}'s`}
        desc={userProfileDesc}
        postData={postData}
      />
    </div>
  );
};

export default UserProfilePage;
