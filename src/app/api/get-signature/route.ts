import { publicSignature } from "@/services/GenerateSignature.service";
import { NextResponse } from "next/server";



export const GET = ()=>{
    return  NextResponse.json( publicSignature(),{status:200})
}