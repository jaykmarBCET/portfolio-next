import mongoose, { Schema, model, Document, Model } from 'mongoose';

interface Language extends Document {
  userId: Schema.Types.ObjectId;
  name: string;
  fluency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Native';
}

const LanguageSchema = new Schema<Language>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  fluency: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Native'],
    required: true,
  },
});

const LanguageModel:Model<Language> =  mongoose.models.Language || model<Language>('Language', LanguageSchema);

export default LanguageModel
