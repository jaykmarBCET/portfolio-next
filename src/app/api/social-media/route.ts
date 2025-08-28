import { dbConnect } from "@/connection/dbConnect";
import SocialMediaModel from "@/models/SocialLinks.model";

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

// ✅ Create Social Media
export const POST = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { platform, url, icon, username } = await req.json();

  const socialMedia = await SocialMediaModel.create({
    userId: user._id,
    platform,
    url,
    icon,
    username,
  });

  return NextResponse.json({ message: "Social media added", socialMedia }, { status: 201 });
};

// ✅ Get Social Media (all or single by id)
export const GET = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { searchParams } = new URL(req.url);
  const socialId = searchParams.get("socialId");

  if (socialId) {
    const social = await SocialMediaModel.findOne({ _id: socialId, userId: user._id });
    if (!social) {
      return NextResponse.json({ message: "Social media not found" }, { status: 404 });
    }
    return NextResponse.json({ social }, { status: 200 });
  }

  const socials = await SocialMediaModel.find({ userId: user._id });
  return NextResponse.json(socials , { status: 200 });
};

// ✅ Update Social Media
export const PUT = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const {  platform, url, icon, username } = await req.json();
  const { searchParams } = new URL(req.url);
  const socialId = searchParams.get("socialId");
  const updated = await SocialMediaModel.findOneAndUpdate(
    { _id: socialId, userId: user._id },
    { platform, url, icon, username },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ message: "Social media not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Social media updated", updated }, { status: 200 });
};

// ✅ Delete Social Media
export const DELETE = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { searchParams } = new URL(req.url);
  const socialId = searchParams.get("socialId");

  if (!socialId) {
    return NextResponse.json({ message: "socialId is required" }, { status: 400 });
  }

  const deleted = await SocialMediaModel.findOneAndDelete({
    _id: socialId,
    userId: user._id,
  });

  if (!deleted) {
    return NextResponse.json({ message: "Social media not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Social media deleted", deleted }, { status: 200 });
};
