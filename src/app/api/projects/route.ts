import { dbConnect } from "@/connection/dbConnect";
import ProjectModel from "@/models/Projects.model";
import ProjectsModel from "@/models/Projects.model";
import { authUser } from "@/services/User.service";
import { NextRequest, NextResponse } from "next/server";



interface ProjectBodyInfo{
    title:string;
    description:string;
    technologies:[string];
    githubUrl:string;
    liveUrl:string;
    imageUrl?:string

}
dbConnect().then(()=>{
    console.log("Database Connected")
}).catch(()=>{
    console.log("Database Field")
})
export const POST = async (req: NextRequest) => {
    
    const response = await authUser(req);
    if (response.message) {
        return NextResponse.json(response, response)
    }
    const user = response.user;
    
    if (!user) {
        return NextResponse.json({ message: "Not found" }, { status: 404 })
    }

    const {title,description,technologies,githubUrl,liveUrl,imageUrl}:ProjectBodyInfo = await req.json();

    if(!title || !description || !technologies || !githubUrl || technologies.length<1){
        return NextResponse.json({message:"Missing Field"},{status:401})
    }
    
    
    const isHave = await ProjectsModel.findOne({title})
    if(isHave){
        return NextResponse.json({message:"Already Have"},{status:401})
    }
    
    
    const newProject = await ProjectsModel.create({
        title,description,technologies,githubUrl,liveUrl,imageUrl,
        userId:user._id
    })
    if(!newProject){
        return NextResponse.json({message:"Project not created, please try again"},{status:401})
    }
    return NextResponse.json(newProject,{status:201})
}

export const PUT = async (req:NextRequest)=>{
    const response = await authUser(req);
    if (response.message) {
        return NextResponse.json(response, response)
    }
    const user = response.user;
    if (!user) {
        return NextResponse.json({ message: "Not found" }, { status: 404 })
    }

    const body:ProjectBodyInfo = await req.json();
    const projectId = (new URL(req.url).searchParams.get("projectId"))
    if(!projectId){
        return NextResponse.json({message:"Project id required"},{status:401})
    }

    if(!body.title || !body.githubUrl || !body.technologies || !body.description){
        return NextResponse.json({message:"Missing field"},{status:401})
    }
    const updatedProject = await ProjectsModel.findOne({_id:projectId,userId:user._id})
    if(!updatedProject){
        return NextResponse.json({message:"Unauthorized project"},{status:401})
    }
    const updated = await ProjectsModel.findByIdAndUpdate(projectId,body);
    return NextResponse.json(updated,{status:201})
}
export const GET = async (req:NextRequest)=>{
    const response = await authUser(req);
    if (response.message) {
        return NextResponse.json(response, response)
    }
    const user = response.user;
    if (!user) {
        return NextResponse.json({ message: "Not found" }, { status: 404 })
    }
    const projects = await ProjectModel.find({userId:user.id});
    return NextResponse.json(projects,{status:200})
}
export const DELETE = async (req:NextRequest)=>{
    const response = await authUser(req);
    if (response.message) {
        return NextResponse.json(response, response)
    }
    const user = response.user;
    if (!user) {
        return NextResponse.json({ message: "Not found" }, { status: 404 })
    }

    const projectId = (new URL(req.url)).searchParams.get("projectId");
    if(!projectId){
        return NextResponse.json({message:"ProjectId required"},{status:401})
    }
    const isHave = await ProjectsModel.findOne({_id:projectId,userId:user._id})
    if(!isHave){
        return NextResponse.json({message:"Unauthorized Project"},{status:401})
    }

    const deleteProject = await ProjectsModel.findByIdAndDelete(projectId);
    return NextResponse.json(deleteProject,{status:200})
}

