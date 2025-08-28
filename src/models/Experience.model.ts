import mongoose, { Schema, model, Document, Model } from 'mongoose';

interface Experience extends Document {
  userId: Schema.Types.ObjectId;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
}

const ExperienceSchema = new Schema<Experience>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  company: { type: String, required: true },
  position: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: Date,
  description: String,
});

const ExperienceModel:Model<Experience> = mongoose.models.Experience || model<Experience>('Experience', ExperienceSchema);

export default ExperienceModel
