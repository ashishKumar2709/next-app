"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import IdeaCard from "./IdeaCard";
import Image from "next/image";

interface IdeaCardProps {
  data: any[];
  setTagValue: (tagValue: string) => void;
}

const IdeaCardList: React.FC<IdeaCardProps> = ({ data, setTagValue }) => {
  const list = data?.map((cardDetails: any, index: number) => (
    <IdeaCard
      key={cardDetails._id}
      postDetails={cardDetails}
      setTagValue={setTagValue}
    />
  ));
  return list;
};

const Posts = () => {
  const [searchValue, setSearchValue] = useState("");
  const [postsData, setPostsData] = useState([]);
  const [tagValue, setTagValue] = useState("");
  const fetchPosts = async () => {
    const fetchResponse = await fetch("/api/postRoutes", {
      method: "GET",
    });
    const fetchedData = await fetchResponse.json();
    console.log(fetchedData);
    setPostsData(fetchedData);
  };

  const handleSearchChange = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log(event.target.value);
    setSearchValue(event.target.value);
    if (event.target.value !== "") {
      const response = await fetch(
        `/api/postRoutes/search?searchVal=${event.target.value}`
      );
      const searchedPosts = await response.json();
      setPostsData(searchedPosts?.data);
    } else {
      fetchPosts();
    }
  };

  const handleTagClick = async () => {
    if (tagValue !== "") {
      const response = await fetch(
        `/api/postRoutes/search?searchVal=${tagValue}`
      );
      const searchedPosts = await response.json();
      setPostsData(searchedPosts?.data);
    } else {
      fetchPosts();
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    handleTagClick();
  }, [tagValue]);

  return (
    <>
    <section>
      <form
        className="flex p-4"
      >
        <input
          placeholder="Search tag and posts"
          className="rounded-md p-0.5 border-gray-400 justify-end"
          type="search"
          value={searchValue}
          onChange={handleSearchChange}
          required
        />
      </form>
      {tagValue && (
        <div className="flex gap-4 p-2">
          <div>{tagValue}</div>
          <div
            className="cursor-pointer"
            onClick={() => {
              setTagValue("");
              fetchPosts();
            }}
            title="reset tag search"
          >
            <Image
              src={"/icons/close_icon.png"}
              alt="cross icon"
              width={25}
              height={25}
            />
          </div>
        </div>
      )}
    </section>
    <div className="flex flex-col gap-4 w-full justify-center items-center mb-20">
    <IdeaCardList data={postsData} setTagValue={setTagValue} />
    </div>
    </>
  );
};

export default Posts;
