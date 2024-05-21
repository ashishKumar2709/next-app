
import PostModel from "@models/post";
import { connectToDB } from "@utils/database";

export async function POST(
  req: Request
){
  const { text, tag, userId } = await req.json();
  try {
    await connectToDB();
    const newPost = new PostModel({
      post: text,
      tag: tag,
      creator: userId,
    });
    await newPost.save();
    return Response.json('Post saved')
  } catch (error) {
    console.error(error)
    return Response.json("Internal server error", { status: 500 });
  }
};

export async function GET() {
  try {
    await connectToDB();
    const postsData = await PostModel.find({}).populate("creator");
    return new Response(JSON.stringify(postsData), { status: 200 });
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: `Internal server error: ${error}` }), { status: 500 });
  }
}

