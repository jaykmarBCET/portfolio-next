import { dbConnect } from "@/connection/dbConnect";
import UserModel from "@/models/User.model";
import { signatureVerify } from "@/services/Signature.service";
import { NextRequest, NextResponse } from "next/server";


dbConnect().then(()=>{
    console.log("Database Connected")
}).catch(()=>{
    console.log("Database Field")
})
export const GET = async(req:NextRequest)=>{
    const response = await signatureVerify(req);
    if(response.message){
        return NextResponse.json(response,response)
    }
    // ok give about User
    const about = await UserModel.findOne().select("-password -createdAt -updatedAt")
    return NextResponse.json(about,{status:200})
}