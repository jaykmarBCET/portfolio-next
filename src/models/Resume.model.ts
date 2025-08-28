import mongoose, { Schema, model, Document, Model } from 'mongoose';

interface Resume extends Document {
  userId: Schema.Types.ObjectId;
  fileUrl: string;           
  uploadedAt: Date;
  fileName?: string;
  fileType?: string;
}

const ResumeSchema = new Schema<Resume>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  fileUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  fileName: String,
  fileType: String,
});

const ResumeModel:Model<Resume> = mongoose.models.Resume || model<Resume>('Resume', ResumeSchema);

export default ResumeModel
