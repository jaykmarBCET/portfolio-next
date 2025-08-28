import { dbConnect } from "@/connection/dbConnect";
import CertificationModel from "@/models/Certification.model";
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

    const certification = await CertificationModel.find()
    return NextResponse.json(certification,{status:200})
}