import { model, models, Schema, Types } from "mongoose";

export interface IInteraction {
  author: Types.ObjectId;
  question: Types.ObjectId;
  views: Types.ObjectId;
  votes: "upvotes" | "downvotes";
  
}

const InteractionSchema = new Schema<IInteraction>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
    views: {}
  },
  { timestamps: true }
);

const Interaction =
  models?.Interaction || model<IInteraction>("Interaction", InteractionSchema);

export default Interaction;