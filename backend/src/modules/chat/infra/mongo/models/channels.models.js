import { Schema, model } from "mongoose";

const ChannelSchema = new Schema(
  {
    name: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default model("Channels", ChannelSchema);
