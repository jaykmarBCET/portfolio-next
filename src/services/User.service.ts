import { dbConnect } from "@/connection/dbConnect"
import UserModel from "@/models/User.model"
import { NextRequest, NextResponse } from "next/server"
import JWT from 'jsonwebtoken'

dbConnect()
export const authUser = async(req:NextRequest)=>{
    const token = req.cookies.get("token")?.value
    if(!token){
        return {message:"Token missing",status:401}
    }

    const decode = JWT.verify(token,process.env.JWT_SECRET_KEY!) as {id:number}

    if(!decode){
        return {message:"Token Expire",status:401}
    }
    const user = await UserModel.findById(decode.id)
    if(!user){
        return {message:"User not found",status:404}
    }
    return {user};
}