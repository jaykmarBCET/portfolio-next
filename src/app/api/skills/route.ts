import { dbConnect } from "@/connection/dbConnect";
import SkillModel from "@/models/Skills.model";
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

// ✅ Create Skill
export const POST = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { name, level,iconName } = await req.json();
  
  const ishave = await SkillModel.findOne({name});
  if(ishave)return NextResponse.json({message:"Already Have"},{status:401})

  const skill = await SkillModel.create({
    userId: user._id,
    iconName,
    name,
    level,
  });

  return NextResponse.json( skill , { status: 201 });
};

// ✅ Get Skills (all or single by id)
export const GET = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { searchParams } = new URL(req.url);
  const skillId = searchParams.get("skillId");

  if (skillId) {
    const skill = await SkillModel.findOne({ _id: skillId, userId: user._id });
    if (!skill) {
      return NextResponse.json({ message: "Skill not found" }, { status: 404 });
    }
    return NextResponse.json({ skill }, { status: 200 });
  }

  const skills = await SkillModel.find({ userId: user._id });
  return NextResponse.json( skills , { status: 200 });
};

// ✅ Update Skill
export const PUT = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const {  name, level,iconName } = await req.json();
  const { searchParams } = new URL(req.url);
  const skillId = searchParams.get("skillId");
 
  const updated = await SkillModel.findOneAndUpdate(
    { _id: skillId, userId: user._id },
    { name, level,iconName },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ message: "Skill not found" }, { status: 404 });
  }

  return NextResponse.json( updated , { status: 200 });
};

// ✅ Delete Skill
export const DELETE = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { searchParams } = new URL(req.url);
  const skillId = searchParams.get("skillId");

  if (!skillId) {
    return NextResponse.json({ message: "skillId is required" }, { status: 400 });
  }

  const deleted = await SkillModel.findOneAndDelete({
    _id: skillId,
    userId: user._id,
  });

  if (!deleted) {
    return NextResponse.json({ message: "Skill not found" }, { status: 404 });
  }

  return NextResponse.json( deleted , { status: 200 });
};
