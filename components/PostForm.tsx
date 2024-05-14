import Link from "next/link";
import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

interface PostFormProps {
  postType: string;
  post: { text: string; tag: string };
  setPost: Dispatch<SetStateAction<{ text: string; tag: string }>>;
  handleSubmit: React.MouseEventHandler<HTMLElement>;
}

const getDescription = (type:string): string=>{
  if(type==='Create'){
    return 'Write your ideas below.'
  }else if(type==='Edit'){
    return 'Edit your post'
  }else{
    return ''
  }
}

const PostForm = (props: PostFormProps) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    props.setPost((pre: { text: string; tag: string }) => ({
      ...pre,
      text: event.target.value,
    }));
  };
  const handleTagChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.setPost((pre: { text: string; tag: string }) => ({
      ...pre,
      tag: event.target.value,
    }));
  };
  return (
    <div className="flex justify-center ">
    <div 
    className="m-4 border border-gray-400 border-solid w-3/4 p-4 bg-gray-400 rounded" suppressHydrationWarning>
      <section>
        <h1 className="text-2xl font-semibold">{props.postType} Post</h1>
        <p className="text-base font-normal">{getDescription(props.postType)}</p>
      </section>
      <form
        className="flex flex-col gap-4"
      >
        <label className="flex flex-col w-3/4">
          <h4 className="text-lg font-semibold mt-2"> Your post</h4>
          <textarea
          className="rounded"
            placeholder="Enter Text"
            onChange={handleChange}
            value={props.post.text}
            aria-multiline
            rows={4}
          />
        </label>
        <label className="flex flex-col w-1/2">
          <h4 className="text-lg font-semibold mt-2"> Tag</h4>
          <input
          className="rounded"
            placeholder="Enter #tag"
            onChange={handleTagChange}
            value={props.post.tag}
          />
        </label>
        <div className="flex justify-end gap-4 max-w-full">
          <Link href={'/'} className="px-4 py-2 bg-gray-200 text-black rounded-md shadow-md transition ease-out duration-100 transform">Cancel</Link>
          <button onClick={props.handleSubmit} className="px-4 py-2 bg-green-200 text-black rounded-md shadow-md transition ease-out duration-100 transform">{props.postType}</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default PostForm;
