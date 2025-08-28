import { dbConnect } from "@/connection/dbConnect";
import ResumeModel from "@/models/Resume.model";
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

// ✅ Upload Resume
export const POST = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { fileUrl, fileName, fileType } = await req.json();

  const resume = await ResumeModel.create({
    userId: user._id,
    fileUrl,
    fileName,
    fileType,
  });

  return NextResponse.json( resume , { status: 201 });
};

// ✅ Get Resume(s)
export const GET = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { searchParams } = new URL(req.url);
  const resumeId = searchParams.get("resumeId");

  if (resumeId) {
    const resume = await ResumeModel.findOne({ _id: resumeId, userId: user._id });
    if (!resume) {
      return NextResponse.json({ message: "Resume not found" }, { status: 404 });
    }
    return NextResponse.json(resume , { status: 200 });
  }

  const resumes = await ResumeModel.find({ userId: user._id });
  return NextResponse.json( resumes , { status: 200 });
};

// ✅ Update Resume Metadata (not the actual file)
export const PUT = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { fileName, fileType } = await req.json();
  const resumeId = (new URL(req.url)).searchParams.get("resumeId")
  const updated = await ResumeModel.findOneAndUpdate(
    { _id: resumeId, userId: user._id },
    { $set: { fileName, fileType } },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ message: "Resume not found" }, { status: 404 });
  }

  return NextResponse.json(updated , { status: 200 });
};

// ✅ Delete Resume
export const DELETE = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { searchParams } = new URL(req.url);
  const resumeId = searchParams.get("resumeId");

  if (!resumeId) {
    return NextResponse.json({ message: "resumeId is required" }, { status: 400 });
  }

  const deleted = await ResumeModel.findOneAndDelete({
    _id: resumeId,
    userId: user._id,
  });

  if (!deleted) {
    return NextResponse.json({ message: "Resume not found" }, { status: 404 });
  }

  return NextResponse.json( deleted , { status: 200 });
};
