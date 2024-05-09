"use client";
import Profile from "@components/Profile";
import React, { useEffect, useState } from "react";
import {  useSearchParams } from "next/navigation";


interface Params{
    params:{
        userId: string
    }
}
const UserProfilePage: React.FC<Params> = ({ params }) => {
    const searchParams = useSearchParams();
    const userName = searchParams.get('userName');
    console.log(userName, params)
    const userProfileDesc = `Your viewing posts by ${userName}`;
  const [postData, setPostData] = useState<any>([]);

  console.log('userId', params.userId);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchResponse = await fetch(`/api/userPosts/${params.userId}`, {
        method: "GET",
      });
      const fetchedData = await fetchResponse.json();
      console.log(fetchedData);
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
