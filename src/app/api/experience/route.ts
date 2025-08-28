import { dbConnect } from "@/connection/dbConnect";
import ExperienceModel from "@/models/Experience.model";
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

// ✅ Create Experience
export const POST = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { company, position, startDate, endDate, description } = await req.json();

  const experience = await ExperienceModel.create({
    userId: user._id,
    company,
    position,
    startDate,
    endDate,
    description,
  });

  return NextResponse.json( experience , { status: 201 });
};

// ✅ Get All Experiences (or single by id)
export const GET = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { searchParams } = new URL(req.url);
  const experienceId = searchParams.get("experienceId");

  if (experienceId) {
    const exp = await ExperienceModel.findOne({ _id: experienceId, userId: user._id });
    if (!exp) {
      return NextResponse.json({ message: "Experience not found" }, { status: 404 });
    }
    return NextResponse.json( exp , { status: 200 });
  }

  const experiences = await ExperienceModel.find({ userId: user._id });
  return NextResponse.json( experiences , { status: 200 });
};

// ✅ Update Experience
export const PUT = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { company, position, startDate, endDate, description } = await req.json();
  const experienceId = (new URL(req.url)).searchParams.get("experienceId")
  const updated = await ExperienceModel.findOneAndUpdate(
    { _id: experienceId, userId: user._id },
    { company, position, startDate, endDate, description },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ message: "Experience not found" }, { status: 404 });
  }

  return NextResponse.json( updated , { status: 200 });
};

// ✅ Delete Experience
export const DELETE = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { searchParams } = new URL(req.url);
  const experienceId = searchParams.get("experienceId");

  if (!experienceId) {
    return NextResponse.json({ message: "experienceId is required" }, { status: 400 });
  }

  const deleted = await ExperienceModel.findOneAndDelete({
    _id: experienceId,
    userId: user._id,
  });

  if (!deleted) {
    return NextResponse.json({ message: "Experience not found" }, { status: 404 });
  }

  return NextResponse.json( deleted , { status: 200 });
};
