import { Session } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface postDetailsType {
  creator: {
    email: string;
    image: string;
    userName: string;
    _id: string;
  };
  post: string;
  tag: string;
  _id: string;
}

interface IdeaCardProps {
  postDetails: postDetailsType;
  setTagValue?: (tagValue: string) => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
  tags: string[];
}

const IdeaCard: React.FC<IdeaCardProps> = ({
  postDetails,
  handleEdit,
  handleDelete,
  setTagValue,
  tags,
}) => {
  const { status }: any = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [copiedPost, setCopiedPost] = useState("");
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getUserSession = async () => {
      const dataS = await getSession();
      setSession(dataS);
    };
    getUserSession();
  }, []);

  const handleCopy = () => {
    setCopiedPost(postDetails.post);
    navigator.clipboard.writeText(postDetails.post);
    setTimeout(() => setCopiedPost(""), 3000);
  };

  const handleProfileView = () => {
    if (postDetails.creator._id === session?.user?.id) {
      router.push("/profile");
    } else {
      router.push(
        `/profile/${postDetails.creator._id}?userName=${postDetails.creator.userName}`
      );
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-screen flex flex-col justify-center items-center gap-4">
      <div className="flex flex-col p-4 border-0 border-solid border-gray-700 shadow-2xl rounded-md w-3/4 rounded bg-blue-50">
        <div className="flex justify-between items-start" suppressHydrationWarning>
          <div
            className="flex gap-4 cursor-pointer"
            onClick={handleProfileView}
          >
            <Image
              src={postDetails.creator.image}
              alt="user_image"
              width="40"
              height="40"
              className="rounded-md w-auto h-auto"
            />
            <div className="flex flex-col m-0">
              <h3 className="text-base font-bold">
                @{postDetails.creator.userName}
              </h3>
              <p className="text-base font-medium text-gray-400">
                {postDetails.creator.email}
              </p>
            </div>
          </div>
          <div
            onClick={handleCopy}
            className="cusrsor-pointer"
            title="Copy post"
          >
            <Image
              src={
                copiedPost === postDetails.post
                  ? "/icons/copied_icon.png"
                  : "/icons/copy_icon.png"
              }
              alt="Logo image"
              width={25}
              height={25}
            />
          </div>
        </div>

        <p className="text-base font-normal text-black">{postDetails.post}</p>
        <div className="flex">
          {tags?.map((tag: string) => (
            <p
              key={tag}
              onClick={() => {
                setTagValue && setTagValue(tag);
              }}
              className={
                pathname === "/profile"
                  ? "text-blue-400"
                  : "text-blue-400 cursor-pointer"
              }
              title={pathname === "/profile" ? `${tag}` : `search ${tag}`}
            >
              &nbsp;#{tag}
            </p>
          ))}
        </div>
        {session?.user?.id === postDetails.creator._id &&
          pathname === "/profile" && (
            <div className="flex gap-4 self-end">
              {handleEdit && (
                <div
                  className="cusrsor-pointer"
                  onClick={() => {
                    handleEdit();
                  }}
                  title="edit post"
                >
                  <Image
                    src={"/icons/edit_icon.png"}
                    alt="Edit icon"
                    width={25}
                    height={25}
                  />
                </div>
              )}
              {handleDelete && (
                <div
                  className="cusrsor-pointer"
                  onClick={() => {
                    handleDelete();
                  }}
                  title="delete post"
                >
                  <Image
                    src={"/icons/delete_icon.png"}
                    alt="Delete icon"
                    width={25}
                    height={25}
                  />
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  );
};

export default IdeaCard;
