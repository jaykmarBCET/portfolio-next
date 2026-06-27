import mongoose, { Schema, model, Document, Model } from 'mongoose';

interface Project extends Document {
  userId: Schema.Types.ObjectId;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?:string;
  skills: Schema.Types.ObjectId[]; // Many-to-many relationship with Skills
  isAndroid?: boolean;
  isIOS?: boolean;
  isMac?: boolean;
  isWeb?: boolean;
  isServer?: boolean;
  isWindows?: boolean;
}

const ProjectSchema = new Schema<Project>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  githubUrl: String,
  liveUrl: String,
  imageUrl: String,
  skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }], // Reference to Skills
  isAndroid: { type: Boolean, default: false },
  isIOS: { type: Boolean, default: false },
  isMac: { type: Boolean, default: false },
  isWeb: { type: Boolean, default: false },
  isServer: { type: Boolean, default: false },
  isWindows: { type: Boolean, default: false },
},{timestamps:true});

const ProjectModel:Model<Project> =  mongoose.models.Project || model<Project>('Project', ProjectSchema);
export default ProjectModel
