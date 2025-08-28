import mongoose, { Schema, model, Document, Model } from 'mongoose';

interface Contact extends Document {
  userId: string;
  name: string;
  email: string;
  message: string;
  dateSent: Date;
}

const ContactSchema = new Schema<Contact>({
  userId: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  dateSent: { type: Date, default: Date.now },
});


const ContactModel:Model<Contact> = mongoose.models.Contact || model<Contact>('Contact', ContactSchema);

export default ContactModel
