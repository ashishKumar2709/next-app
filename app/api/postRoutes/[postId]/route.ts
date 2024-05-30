import PostModel from "@models/post";
import { connectToDB } from "@utils/database";

type Params = {
  postId: string;
};

export async function GET(request: Request, context: { params: Params }) {
  try {
    await connectToDB();
    const userPost = await PostModel.findById(context.params.postId).populate(
      "creator"
    ).sort({'updatedAt':-1});
    if (!userPost) return new Response("Prompt not Found", { status: 404 });
    return new Response(JSON.stringify(userPost), { status: 200 });
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}

export async function PATCH(req: Request, context: { params: Params }) {
  const { text, tag } = await req.json();
  try {
    await connectToDB();
    const userPost = await PostModel.findById(context.params.postId).populate(
      "creator"
    );
    if (!userPost) return new Response("Prompt not Found", { status: 404 });
    userPost.post = text;
    userPost.tag = tag;
    await userPost.save();
    return new Response(JSON.stringify(userPost), { status: 200 });
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}

export async function DELETE(request: Request, context:{params: Params}) {
    try {
      await connectToDB();
      const userPost = await PostModel.findByIdAndDelete(context.params.postId);
      return new Response("Post Deleted", { status: 200 });
    } catch (error) {
      return new Response("Internal server error", { status: 500 });
    }
}