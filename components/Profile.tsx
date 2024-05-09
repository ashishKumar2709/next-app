import React from "react";
import IdeaCard from "./IdeaCard";

interface ProfilePropsType {
  profileType: string;
  desc: string;
  handleEdit?: (post: { _id: string }) => void;
  handleDelete?: (post: { _id: string }) => void;
  postData: [];
}

const Profile: React.FC<ProfilePropsType> = ({
  profileType,
  desc,
  handleEdit,
  handleDelete,
  postData,
}) => {
  console.log(postData)
  return (
    <>
    <div className="flex flex-col gap-4 w-full items-center mb-20">
    <section
      className="flex justify-self-start m-4 flex-col"
    >
      <h1 className="capitalize text-2xl font-semibold">{profileType}&nbsp;Profile</h1>
      <p className="text-base font-normal">{desc}</p>
    </section>
    {handleEdit && handleDelete ? postData?.map((post: any, index: number) => (
      <IdeaCard
        key={post._id}
        postDetails={post}
        handleEdit={()=>handleEdit(post)}
        handleDelete={()=>handleDelete(post)}
      />
    )):
    postData?.map((post: any, index: number) => (
      <IdeaCard
        key={post._id}
        postDetails={post}
      />
    ))
    }
  </div>
  </>
  );
};

export default Profile;
