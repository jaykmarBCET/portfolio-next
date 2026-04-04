import { dbConnect } from "@/connection/dbConnect";
import UserModel from "@/models/User.model";
import { generateToken } from "@/services/GenerateToken.service";
import { authUser } from "@/services/User.service";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

dbConnect().then(()=>{
    console.log("Database Connected")
}).catch(()=>{
    console.log("Database Field")
})

export const POST = async (req:NextRequest)=>{
  const {name,email,password,stackName=[]}:{name:string;email:string;password:string;stackName?:string[]} = await req.clone().json();
  if(!email || !password){
    return NextResponse.json({message:"Email and password required"},{status:401})
  }

  try {
    const currentUser = await UserModel.findOne({email})
    if(!currentUser){
      throw Error("No Account")
    }
    
     const isPasswordCurrent = await bcrypt.compare(password,currentUser.password!)
     if(!isPasswordCurrent){
       return NextResponse.json({message:"Password incorrect"},{status:401})
     }
    const token = generateToken(currentUser._id as string)
    const cookiesStore =  await cookies()
    cookiesStore.set("token",token,{sameSite:true,maxAge:24*7*60*60*1000})
    return NextResponse.json(currentUser,{status:200})
    
  } catch (e) {
    const error = e as Error;
    console.log(error)
    const totalUserLen = await UserModel.find();

    if(totalUserLen.length>=1){
      return NextResponse.json({message:"User account creating not allowed"},{status:403})
    }
    if(!name){
      return NextResponse.json({message:"Name required"},{status:401})
    }

    const hashPassword = await bcrypt.hash(password,10)
    const newUser = await UserModel.create({email,name,password:hashPassword,stackName})

    if(!newUser){
      return NextResponse.json({message:"Something went wrong, please try again"},{status:500})
    }

    const token = generateToken(newUser._id as string)
    if(!token){
      return NextResponse.json({message:"Something went wrong while generating token"},{status:500})
    }
    const cookiesStore = await cookies()
    cookiesStore.set("token",token,{sameSite:"strict",maxAge:7*24*60*60*1000})
    return NextResponse.json(newUser,{status:201})
  }
}

interface UpdateBody{
  name?: string;
  email?: string;
  avatarUrl?: string;
  stackName?: string[];
  bio?: string;
  password?: string;
}
export const PUT = async(req:NextRequest)=>{
  const response = await authUser(req);

  if(response.message){
    return NextResponse.json(response, { status: response.status || 401 })
  }
  const user = response.user;

  if(!user){
    return NextResponse.json({message:"Not found"},{status:404})
  }

  const { name, email, password, avatarUrl, stackName, bio }: UpdateBody = await req.clone().json()
  const updateData: Partial<UpdateBody> = {}

  if (name) updateData.name = name
  if (email) updateData.email = email
  if (avatarUrl) updateData.avatarUrl = avatarUrl
  if (Array.isArray(stackName)) updateData.stackName = stackName
  if (bio) updateData.bio = bio
  if (password) {
    updateData.password = await bcrypt.hash(password, 10)
  }

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ message: 'No fields to update' }, { status: 400 })
  }

  const updateUser = await UserModel.findByIdAndUpdate(user._id, updateData, { new: true })
  return NextResponse.json(updateUser,{status:200})
}

export const GET = async(req:NextRequest)=>{
  const response = await authUser(req);
  if(response.message){
    return NextResponse.json(response,response)
  }
  const user = response.user;
  if(!user){
    return NextResponse.json({message:"Not found"},{status:404})
  }
  return NextResponse.json(user,{status:200})
}


