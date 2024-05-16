import React from "react";
import dynamic from "next/dynamic";
import IdeaCardSkeleton from "./IdeaCardSkeleton";

const IdeaCard = dynamic(() => import('./IdeaCard'), {
  loading: () => <IdeaCardSkeleton/>,
})


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
  
  return (
    <>
    <div className="flex flex-col gap-4 w-full items-center mb-20">
    <section
      className="flex justify-self-start m-4 flex-col"
    >
      <h1 className="capitalize text-2xl font-semibold">{profileType}&nbsp;Profile</h1>
      <p className="text-base font-normal">{desc}</p>
    </section>
    {handleEdit && handleDelete ? postData?.map((post: any, index: number) => {
      const tags = post.tag.split(',').map((tag:string)=>`${tag.trim()}`)
      return <IdeaCard
      key={post._id}
      postDetails={post}
      handleEdit={()=>handleEdit(post)}
      handleDelete={()=>handleDelete(post)}
      tags={tags}
    />
    }):
    postData?.map((post: any, index: number) => {
      const tags = post.tag.split(',').map((tag:string)=>`${tag.trim()}`)
      return <IdeaCard
      key={post._id}
      postDetails={post}
      tags={tags}
    />
    })
    }
  </div>
  </>
  );
};

export default Profile;
