import { dbConnect } from "@/connection/dbConnect";
import LanguageModel from "@/models/Language.model";
import { authUser } from "@/services/User.service";
import { NextRequest, NextResponse } from "next/server";


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

// ✅ Create Language
export const POST = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { name, fluency } = await req.json();

  const language = await LanguageModel.create({
    userId: user._id,
    name,
    fluency,
  });

  return NextResponse.json( language , { status: 201 });
};

// ✅ Get Languages (all or single by id)
export const GET = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { searchParams } = new URL(req.url);
  const languageId = searchParams.get("languageId");

  if (languageId) {
    const language = await LanguageModel.findOne({ _id: languageId, userId: user._id });
    if (!language) {
      return NextResponse.json({ message: "Language not found" }, { status: 404 });
    }
    return NextResponse.json( language , { status: 200 });
  }

  const languages = await LanguageModel.find({ userId: user._id });
  return NextResponse.json( languages , { status: 200 });
};

// ✅ Update Language
export const PUT = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { name, fluency } = await req.json();
  const languageId = (new URL(req.url)).searchParams.get("languageId")

  const updated = await LanguageModel.findOneAndUpdate(
    { _id: languageId, userId: user._id },
    { name, fluency },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ message: "Language not found" }, { status: 404 });
  }

  return NextResponse.json( updated , { status: 200 });
};

// ✅ Delete Language
export const DELETE = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { searchParams } = new URL(req.url);
  const languageId = searchParams.get("languageId");

  if (!languageId) {
    return NextResponse.json({ message: "languageId is required" }, { status: 400 });
  }

  const deleted = await LanguageModel.findOneAndDelete({
    _id: languageId,
    userId: user._id,
  });

  if (!deleted) {
    return NextResponse.json({ message: "Language not found" }, { status: 404 });
  }

  return NextResponse.json( deleted , { status: 200 });
};
