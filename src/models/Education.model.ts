import mongoose, { Schema, model, Document, Model } from 'mongoose';

interface Education extends Document {
  userId: Schema.Types.ObjectId;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate: Date;
  grade?: string;
  description?: string;
}

const EducationSchema = new Schema<Education>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: String,
},{timestamps:true});

const EducationModel: Model<Education> = mongoose.models.Education || model<Education>('Education', EducationSchema);
export default EducationModel
