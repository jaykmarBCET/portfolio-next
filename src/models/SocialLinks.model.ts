import mongoose, { Schema, model, Document, Model } from 'mongoose';

interface SocialMedia extends Document {
  userId: Schema.Types.ObjectId;
  platform: string;       // e.g., "GitHub", "LinkedIn"
  url: string;            // The full URL to the profile
  icon?: string;          // Optional icon class (e.g., "fa fa-github" or image link)
  username?: string;      // Optional for display
}

const SocialMediaSchema = new Schema<SocialMedia>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  platform: { type: String, required: true },
  url: { type: String, required: true },
  icon: String,
  username: String,
});

const SocialMediaModel:Model<SocialMedia> = mongoose.models.SocialMedia || model<SocialMedia>('SocialMedia', SocialMediaSchema);

export default SocialMediaModel
