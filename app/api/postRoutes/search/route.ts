import PostModel from "@models/post";
import { connectToDB } from "@utils/database";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    let searchVal = req.nextUrl.searchParams.get("searchVal");
    if (searchVal === null || searchVal === undefined) {
        searchVal = ''; // Default value if searchVal is null or undefined
    } else {
        searchVal = searchVal.trim(); // Trim whitespace
    }

    console.log("Search value:", searchVal);

    try {
        await connectToDB();

        const postsData = await PostModel.find(
            {
                $or: [
                    { post: { $regex: new RegExp(searchVal, "i") } },
                    { tag: { $regex: new RegExp(searchVal, "i") } },
                    { "creator.userName": { $regex: new RegExp(searchVal, "i") } }
                ]
            },
          ).populate('creator');

        // const postsData = await PostModel.find(
        //     { $text: { $search: searchVal } },
        //     { score: { $meta: "textScore" } }
        // ).sort({ score: { $meta: "textScore" } }).populate('creator');

        console.log("Search results:", postsData);
        return new Response(JSON.stringify({ success: true, data: postsData }), { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ success: false, error: "Internal server error" }), { status: 500 });
    }
}
