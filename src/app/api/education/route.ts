import { dbConnect } from "@/connection/dbConnect";
import EducationModel from "@/models/Education.model";
import { authUser } from "@/services/User.service";
import { NextRequest,NextResponse } from "next/server";

interface EducationInfo{
    userId?:string;
    institution:string;
    degree:string;
    fieldOfStudy:string;
    startDate:string;
    endDate:string;
    description?:string;
}

dbConnect().then(()=>{
    console.log("Database Connected")
}).catch(()=>{
    console.log("Database Field")
})
export const POST = async(req:NextRequest)=>{
    const response = await authUser(req);
        if (response.message) {
            return NextResponse.json(response, response)
        }
        const user = response.user;
        if (!user) {
            return NextResponse.json({ message: "Not found" }, { status: 404 })
        }
        const body:EducationInfo = await req.json();
        const isHave =  await EducationModel.findOne({degree:body.degree});
        if(isHave){
            return NextResponse.json({message:"Already Have"},{status:401})
        }
        for(const x in body){
            if(x==='description')continue
            else if(!x){
                return NextResponse.json({message:"Missing field"},{status:401})
            }
        }

        const newEducation = await EducationModel.create({...body,userId:user._id});
        if(!newEducation){
            return NextResponse.json({message:"Please try again"},{status:401})
        }
        return NextResponse.json(newEducation,{status:201})
}




export const PUT = async(req:NextRequest)=>{
    const response = await authUser(req);
    if (response.message) {
        return NextResponse.json(response, response)
    }
    const user = response.user;
    if (!user) {
        return NextResponse.json({ message: "Not found" }, { status: 404 })
    }

    const body:EducationInfo = await req.json();
    const educationId = (new URL(req.url)).searchParams.get("educationId")
    if(!educationId){
        return NextResponse.json({message:"EducationId required"},{status:401})
    }
    for( const x in body){
        if(x==='description')continue;
        else if(!x){
            return NextResponse.json({message:"Mission field"},{status:401})
        }
    }

    const updatedUser = await EducationModel.findByIdAndUpdate(educationId,body,{new:true});
    if(!updatedUser){
        return NextResponse.json({message:"Please try again"},{status:401})
    }
    return NextResponse.json(updatedUser,{status:200})
}

export const GET = async(req:NextRequest)=>{
    const response = await authUser(req);
    if (response.message) {
        return NextResponse.json(response, response)
    }
    const user = response.user;
    if (!user) {
        return NextResponse.json({ message: "Not found" }, { status: 404 })
    }
    const allEduction = await EducationModel.find();

    return NextResponse.json(allEduction,{status:200})
}
export const DELETE = async(req:NextRequest)=>{
    const response = await authUser(req);
        if (response.message) {
            return NextResponse.json(response, response)
        }
        const user = response.user;
        if (!user) {
            return NextResponse.json({ message: "Not found" }, { status: 404 })
        }
    const educationId = (new URL(req.url)).searchParams.get("educationId")

    if(!educationId){
        return NextResponse.json({message:"EducationId required"},{status:401})
    }
    const deleteEducation = await EducationModel.findByIdAndDelete(educationId)

    if(!deleteEducation){
        return NextResponse.json({message:"Please try again"},{status:401})
    }
    return NextResponse.json(deleteEducation)

}