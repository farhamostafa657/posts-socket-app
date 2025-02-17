import { model, Schema, Types } from "mongoose";

const postsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "this field is required"],
    },
    description: {
      type: String,
      required: [true, "this field is required"],
    },
  },
  { timestamps: true } // keys of create at and update at
);

const postsModel = model("postsModel", postsSchema);

export default postsModel;
