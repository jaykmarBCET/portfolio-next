import { dbConnect } from "@/connection/dbConnect";
import AwardModel from "@/models/Awards.model";
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

// ✅ Create Award
export const POST = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { title, issuer, date, description } = await req.json();

  const award = await AwardModel.create({
    userId: user._id,
    title,
    issuer,
    date,
    description,
  });

  return NextResponse.json({ message: "Award added", award }, { status: 201 });
};

// ✅ Get Awards (all or single by id)
export const GET = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { searchParams } = new URL(req.url);
  const awardId = searchParams.get("awardId");

  if (awardId) {
    const award = await AwardModel.findOne({ _id: awardId, userId: user._id });
    if (!award) {
      return NextResponse.json({ message: "Award not found" }, { status: 404 });
    }
    return NextResponse.json({ award }, { status: 200 });
  }

  const awards = await AwardModel.find({ userId: user._id });
  return NextResponse.json({ awards }, { status: 200 });
};

// ✅ Update Award
export const PUT = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { awardId, title, issuer, date, description } = await req.json();

  const updated = await AwardModel.findOneAndUpdate(
    { _id: awardId, userId: user._id },
    { title, issuer, date, description },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ message: "Award not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Award updated", updated }, { status: 200 });
};

// ✅ Delete Award
export const DELETE = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { searchParams } = new URL(req.url);
  const awardId = searchParams.get("awardId");

  if (!awardId) {
    return NextResponse.json({ message: "awardId is required" }, { status: 400 });
  }

  const deleted = await AwardModel.findOneAndDelete({
    _id: awardId,
    userId: user._id,
  });

  if (!deleted) {
    return NextResponse.json({ message: "Award not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Award deleted", deleted }, { status: 200 });
};
