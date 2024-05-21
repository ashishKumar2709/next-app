"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import IdeaCardSkeleton from "./IdeaCardSkeleton";

const IdeaCard = dynamic(() => import('./IdeaCard'), {
  loading: () => <IdeaCardSkeleton/>,
})

interface IdeaCardProps {
  data: any[];
  setTagValue: (tagValue: string) => void;
}

const IdeaCardList: React.FC<IdeaCardProps> = ({ data, setTagValue }) => {
  const list = data?.map((cardDetails: any, index: number) => {
    const tags = cardDetails?.tag?.split(',')?.map((tag:string)=>`${tag.trim()}`)
    return (
      <IdeaCard
        key={cardDetails._id}
        postDetails={cardDetails}
        setTagValue={setTagValue}
        tags={tags}
      />
    );
  });
  return list;
};

const Posts:React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [postsData, setPostsData] = useState([]);
  const [tagValue, setTagValue] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const fetchResponse = await fetch("/api/postRoutes", {
        method: "GET",
      });
      const fetchedData = await fetchResponse.json();
      setPostsData(fetchedData);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const handleTagClick = async () => {
      if (tagValue !== "") {
        try {
          const response = await fetch(
            `/api/postRoutes/search?searchVal=${tagValue}`
          );
          const searchedPosts = await response.json();
          setPostsData(searchedPosts?.data);
        } catch (error) {
          console.error("Error fetching tagged posts:", error);
        } finally {
          setLoading(false);
        }
      } else {
        fetchPosts();
      }
    };
    handleTagClick();
  }, [tagValue]);

  const handleSearchChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setTagValue("");
    setSearchValue(event.target.value);
    if (event.target.value !== "") {
      try {
        const response = await fetch(
          `/api/postRoutes/search?searchVal=${event.target.value}`
        );
        const searchedPosts = await response.json();
        setPostsData(searchedPosts?.data);
      } catch (error) {
        console.error("Error searching posts:", error);
      }
    } else {
      fetchPosts();
    }
  };

  return (
    <>
    {loading ? (
      <div className="text-base font-bold m-8 flex h-screen">Loading....</div>
    ) : (
      <div>
        <section>
          <form className="flex justify-center items-center p-4">
            <input
              placeholder="Search tag and posts"
              className="rounded-md p-0.5 border-gray-400 w-1/2"
              type="search"
              value={searchValue}
              onChange={handleSearchChange}
              required
            />
          </form>
          {tagValue && (
            <div className="flex justify-center items-center gap-4 p-2">
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
      </div>
    )}
  </>
  );
};

export default Posts;
