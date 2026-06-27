import mongoose, { Schema, model, Document, Model } from 'mongoose';

interface Skill extends Document {
  userId: Schema.Types.ObjectId;
  name: string;
  iconName?:string;
  isAndroid:boolean;
  isWeb:boolean;
  isISO:boolean;
  isWindows:boolean;
  isMac:boolean;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

const SkillSchema = new Schema<Skill>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  
  iconName:String,
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    required: true,
  },
  isAndroid: { type: Boolean, default: false },
  isWeb: { type: Boolean, default: false },
  isISO: { type: Boolean, default: false },
  isWindows: { type: Boolean, default: false },
  isMac: { type: Boolean, default: false },
  
});

const SkillModel:Model<Skill> = mongoose.models.Skill || model<Skill>('Skill', SkillSchema);

export default SkillModel
