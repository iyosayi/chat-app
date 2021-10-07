import { Schema, model } from "mongoose";

const RecipientSchema = new Schema(
  {
    readByUserId: { type: Schema.Types.ObjectId, ref: "User" },
    readAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: false,
  }
);
const Recipients = model("Recipient", RecipientSchema);

const ChatSchema = new Schema(
  {
    message: { type: Schema.Types.Mixed },
    postedBy: { type: Schema.Types.ObjectId, ref: "User" },
    channelId: { type: Schema.Types.ObjectId, ref: "Channels" },
    readRecipients: [{ type: Schema.Types.ObjectId, ref: "Recipient" }],
  },
  { timestamps: true }
);

export default model("ChatMessage", ChatSchema);
