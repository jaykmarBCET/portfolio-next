import { NextRequest} from "next/server";
import JWT from 'jsonwebtoken'

export const signatureVerify = async(req:NextRequest)=>{
    const signature = req.headers.get("signature");
    if(!signature){
        return {message:"Something Missing",status:401}
    }
    const decode = JWT.verify(signature,process.env.JWT_SIGNATURE_TOKEN!) as {id:string}
    if(decode.id !==process.env.JWT_SIGNATURE_ID){
        return {message:'Signature id not match',status:401}
    }
    if(!decode){
        return {message:"Not Match",status:401}
    }
    return {ok:"ok"}
}