import { dbConnect } from "@/connection/dbConnect";
import ProjectModel from "@/models/Projects.model";
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
    const projectId = (new URL(req.url)).searchParams.get("projectId")
    if(projectId){
        const singleProject = await ProjectModel.findById(projectId).populate('skills', 'name level iconName isAndroid isWeb isISO isWindows isMac')
        return NextResponse.json(singleProject,{status:200})
    }

    const allProject = await ProjectModel.find().select("-createdAt -updatedAt -userId").populate('skills', 'name level iconName isAndroid isWeb isISO isWindows isMac');

    if(!allProject){
        return NextResponse.json({message:"Empty"},{status:200})
    }
    return NextResponse.json(allProject,{status:200})
}