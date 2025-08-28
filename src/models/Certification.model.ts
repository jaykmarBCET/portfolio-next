
import mongoose, { Schema, model, Document, Model } from 'mongoose';

interface Certification extends Document {
  userId: Schema.Types.ObjectId;
  title: string;
  issuer: string;
  dateIssued: Date;
  credentialUrl?: string;
}

const CertificationSchema = new Schema<Certification>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  dateIssued: { type: Date, required: true },
  credentialUrl: String,
});

const CertificationModel:Model<Certification> = mongoose.models.Certification || model<Certification>('Certification', CertificationSchema);
export default CertificationModel
