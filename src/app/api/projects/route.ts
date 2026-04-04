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
    imageUrl?:string;
    skills?: string[]; // Array of skill IDs
    isAndroid?: boolean;
    isIOS?: boolean;
    isMac?: boolean;
    isWeb?: boolean;
    isServer?: boolean;
    isWindows?: boolean;
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

    const {title,description,technologies,githubUrl,liveUrl,imageUrl,skills,isAndroid,isIOS,isMac,isWeb,isServer,isWindows}:ProjectBodyInfo = await req.json();

    if(!title || !description || !technologies || !githubUrl || technologies.length<1){
        return NextResponse.json({message:"Missing Field"},{status:401})
    }
    
    
    const isHave = await ProjectsModel.findOne({title})
    if(isHave){
        return NextResponse.json({message:"Already Have"},{status:401})
    }
    
    
    const newProject = await ProjectsModel.create({
        title,description,technologies,githubUrl,liveUrl,imageUrl,
        skills: skills || [],
        isAndroid: isAndroid || false,
        isIOS: isIOS || false,
        isMac: isMac || false,
        isWeb: isWeb || false,
        isServer: isServer || false,
        isWindows: isWindows || false,
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
    const updated = await ProjectsModel.findByIdAndUpdate(projectId,{
        title: body.title,
        description: body.description,
        technologies: body.technologies,
        githubUrl: body.githubUrl,
        liveUrl: body.liveUrl,
        imageUrl: body.imageUrl,
        skills: body.skills || [],
        isAndroid: body.isAndroid || false,
        isIOS: body.isIOS || false,
        isMac: body.isMac || false,
        isWeb: body.isWeb || false,
        isServer: body.isServer || false,
        isWindows: body.isWindows || false,
    });
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
    const projects = await ProjectModel.find({userId:user._id}).populate('skills', 'name level iconName');
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

