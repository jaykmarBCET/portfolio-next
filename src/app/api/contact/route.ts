import { dbConnect } from "@/connection/dbConnect";
import ContactModel from "@/models/Contact.model";
import { authUser } from "@/services/User.service";
import { NextRequest, NextResponse } from "next/server";
import { SendMail } from "@/services/Mail.service";
dbConnect().then(()=>{
    console.log("Database Connected")
}).catch(()=>{
    console.log("Database Field")
})

const handleAuth = async (req: NextRequest) => {
  const response = await authUser(req);

  if (response.message) {
    return NextResponse.json(response, { status: response.status || 401 });
  }

  const user = response.user;
  if (!user) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return user;
};

// ✅ Create Contact
export const POST = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { name, email, message } = await req.json();
 

  const contact = await ContactModel.create({
    userId: user._id,
    name,
    email,
    message,
  });
  SendMail({message,name,email})  

  return NextResponse.json({ message: "Contact created", contact }, { status: 201 });
};

// ✅ Get Contacts (all or single by id)
export const GET = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { searchParams } = new URL(req.url);
  const contactId = searchParams.get("contactId");

  if (contactId) {
    const contact = await ContactModel.find({ _id: contactId});
    if (!contact) {
      return NextResponse.json({ message: "Contact not found" }, { status: 404 });
    }
    return NextResponse.json({ contact }, { status: 200 });
  }

  const contacts = await ContactModel.find();
  return NextResponse.json(contacts , { status: 200 });
};

// ✅ Update Contact (partial update supported)
export const PUT = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { name, email, message } = await req.json();
  const contactId = (new URL(req.url)).searchParams.get("contactId")
  const updated = await ContactModel.findOneAndUpdate(
    { _id: contactId, userId: user._id },
    { $set: { name, email, message } },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ message: "Contact not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Contact updated", updated }, { status: 200 });
};

// ✅ Delete Contact
export const DELETE = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { searchParams } = new URL(req.url);
  const contactId = searchParams.get("contactId");

  if (!contactId) {
    return NextResponse.json({ message: "contactId is required" }, { status: 400 });
  }

  const deleted = await ContactModel.findOneAndDelete({
    _id: contactId,
    userId: user._id,
  });

  if (!deleted) {
    return NextResponse.json({ message: "Contact not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Contact deleted", deleted }, { status: 200 });
};
