import mongoose, { Schema, model, Document, Model } from 'mongoose';

interface Interest extends Document {
  userId: Schema.Types.ObjectId;
  name: string;
  description?: string;
}

const InterestSchema = new Schema<Interest>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
});

const InterestModel:Model<Interest> =  mongoose.models.Interest || model<Interest>('Interest', InterestSchema);

export default InterestModel