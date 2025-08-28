import { dbConnect } from "@/connection/dbConnect";
import InterestModel from "@/models/Interests.model";
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

// ✅ Create Interest
export const POST = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { name, description } = await req.json();

  const interest = await InterestModel.create({
    userId: user._id,
    name,
    description,
  });

  return NextResponse.json(interest , { status: 201 });
};

// ✅ Get All Interests of User
export const GET = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const interests = await InterestModel.find({ userId: user._id });
  return NextResponse.json( interests , { status: 200 });
};

// ✅ Update Interest
export const PUT = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const {  name, description } = await req.json();
  const interestId = (new URL(req.url)).searchParams.get("interestId")
  const updated = await InterestModel.findOneAndUpdate(
    { _id: interestId, userId: user._id },
    { name, description },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ message: "Interest not found" }, { status: 404 });
  }

  return NextResponse.json( updated , { status: 200 });
};

// ✅ Delete Interest
export const DELETE = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { searchParams } = new URL(req.url);
  const interestId = searchParams.get("interestId");

  if (!interestId) {
    return NextResponse.json({ message: "InterestId is required" }, { status: 400 });
  }

  const deleted = await InterestModel.findOneAndDelete({
    _id: interestId,
    userId: user._id,
  });

  if (!deleted) {
    return NextResponse.json({ message: "Interest not found" }, { status: 404 });
  }

  return NextResponse.json( deleted , { status: 200 });
};
