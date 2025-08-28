import { publicSignature } from "@/services/GenerateSignature.service";
import { NextRequest, NextResponse } from "next/server";



export const GET = (req:NextRequest)=>{
    return  NextResponse.json( publicSignature(),{status:200})
}