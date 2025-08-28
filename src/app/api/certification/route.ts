import { dbConnect } from "@/connection/dbConnect";
import CertificationModel from "@/models/Certification.model";

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

// ✅ Create Certification
export const POST = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { title, issuer, dateIssued, credentialUrl } = await req.json();

  const certification = await CertificationModel.create({
    userId: user._id,
    title,
    issuer,
    dateIssued,
    credentialUrl,
  });

  return NextResponse.json(certification, { status: 201 });
};

// ✅ Get Certifications (all or single by id)
export const GET = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { searchParams } = new URL(req.url);
  const certificationId = searchParams.get("certificationId");

  if (certificationId) {
    const certification = await CertificationModel.findOne({ _id: certificationId, userId: user._id });
    if (!certification) {
      return NextResponse.json({ message: "Certification not found" }, { status: 404 });
    }
    return NextResponse.json( certification , { status: 200 });
  }

  const certifications = await CertificationModel.find({ userId: user._id });
  return NextResponse.json( certifications , { status: 200 });
};

// ✅ Update Certification
export const PUT = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { title, issuer, dateIssued, credentialUrl } = await req.json();
  const certificationId = (new URL(req.url)).searchParams.get("certificationId")
  const updated = await CertificationModel.findOneAndUpdate(
    { _id: certificationId, userId: user._id },
    { title, issuer, dateIssued, credentialUrl },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ message: "Certification not found" }, { status: 404 });
  }

  return NextResponse.json(updated, { status: 200 });
};

// ✅ Delete Certification
export const DELETE = async (req: NextRequest) => {
  const user = await handleAuth(req);
  if (user instanceof NextResponse) return user;

  const { searchParams } = new URL(req.url);
  const certificationId = searchParams.get("certificationId");

  if (!certificationId) {
    return NextResponse.json({ message: "certificationId is required" }, { status: 400 });
  }

  const deleted = await CertificationModel.findOneAndDelete({
    _id: certificationId,
    userId: user._id,
  });

  if (!deleted) {
    return NextResponse.json({ message: "Certification not found" }, { status: 404 });
  }

  return NextResponse.json( deleted , { status: 200 });
};
