import PostModel from "@models/post";
import { connectToDB } from "@utils/database";

type Params = {
    userId: string
}

export async function GET(req:Request, contenxt:{params:Params}) {
    try {
      await connectToDB();
      const postData = await PostModel.find({creator:contenxt.params.userId}).populate("creator");
      return new Response(JSON.stringify(postData), { status: 200 });
    } catch (error) {
      return new Response("Internal server error", { status: 500 });
    }
  }
  