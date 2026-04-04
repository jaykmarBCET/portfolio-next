import mongoose, { Schema, model, Document, Model } from 'mongoose';

interface Resume extends Document {
  userId: Schema.Types.ObjectId;
  fileUrl: string;           
  uploadedAt: Date;
  fileName?: string;
  fileType?: string;
  isAndroid?: boolean;
  isIOS?: boolean;
  isMac?: boolean;
  isWeb?: boolean;
  isServer?: boolean;
  isWindows?: boolean;
}

const ResumeSchema = new Schema<Resume>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  fileUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  fileName: String,
  fileType: String,
  isAndroid: { type: Boolean, default: false },
  isIOS: { type: Boolean, default: false },
  isMac: { type: Boolean, default: false },
  isWeb: { type: Boolean, default: false },
  isServer: { type: Boolean, default: false },
  isWindows: { type: Boolean, default: false },
});

const ResumeModel:Model<Resume> = mongoose.models.Resume || model<Resume>('Resume', ResumeSchema);

export default ResumeModel
