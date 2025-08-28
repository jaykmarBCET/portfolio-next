import mongoose, { Schema, model, Document, Model } from 'mongoose';

interface Skill extends Document {
  userId: Schema.Types.ObjectId;
  name: string;
  iconName?:string;
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
});

const SkillModel:Model<Skill> = mongoose.models.Skill || model<Skill>('Skill', SkillSchema);

export default SkillModel
