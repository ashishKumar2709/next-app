import mongoose, { model, models } from "mongoose";
import "./user";

const postSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: String,
      required: [true, "Post is required!"],
    },
    tag: {
      type: String,
      required: [true, "tag is required"],
    },
  },
  { timestamps: true }
);

const PostModel = models.Post || model("Post", postSchema);

export default PostModel;
