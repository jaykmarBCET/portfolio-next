import mongoose, { Schema, model, Document, Model } from "mongoose";

interface Award extends Document {
  userId: Schema.Types.ObjectId;
  title: string;
  issuer: string;
  date: Date;
  description?: string;
}

const AwardSchema = new Schema<Award>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
});

const AwardModel: Model<Award> =
  mongoose.models.Award || model<Award>("Award", AwardSchema);

export default AwardModel;
