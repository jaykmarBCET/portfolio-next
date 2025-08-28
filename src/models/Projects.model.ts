import mongoose, { Schema, model, Document, Model } from 'mongoose';

interface Project extends Document {
  userId: Schema.Types.ObjectId;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?:string;
}

const ProjectSchema = new Schema<Project>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  githubUrl: String,
  liveUrl: String,
  imageUrl:String,
},{timestamps:true});

const ProjectModel:Model<Project> =  mongoose.models.Project || model<Project>('Project', ProjectSchema);
export default ProjectModel
