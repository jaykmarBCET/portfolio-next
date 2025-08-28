
import { dbConnect } from "@/connection/dbConnect";
import EducationModel from "@/models/Education.model";
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

    const allAwards = await EducationModel.find().select("-createdAt -updatedAt");

    return NextResponse.json(allAwards,{status:200})
}