import { dbConnect } from "@/connection/dbConnect";
import ContactModel from "@/models/Contact.model";
import { checkBadWords } from "@/services/BadWord.service";
import { SendMail } from "@/services/Mail.service";
import { signatureVerify } from "@/services/Signature.service";
import { NextRequest, NextResponse } from "next/server";



dbConnect().then(()=>{
    console.log("Database Connected")
}).catch(()=>{
    console.log("Database Field")
})


// export const GET = async(req:NextRequest)=>{
//     const response = await signatureVerify(req);
//     if(response.message){
//         return NextResponse.json(response,response)
//     }

//     const allAwards = await ContactModel.find().select("-createdAt -updatedAt");

//     return NextResponse.json(allAwards,{status:200})
// }

export const POST = async (req: NextRequest) => {
  const response = await signatureVerify(req)
  if(response.message){
    return NextResponse.json(response,response)
  }
  const { name, email, message } = await req.json();
  if(!name || !email || !message){
    return NextResponse.json({message:"All field required"},{status:401})
  }
  const isBadWord = checkBadWords(message)
  if(typeof isBadWord=== 'boolean'){
    return NextResponse.json({message:"Please don't write bad words"},{status:401})
  }

  const contact = await ContactModel.create({
    userId: "userId",
    name,
    email,
    message,
  });
  SendMail({message,name,email})  

  return NextResponse.json({ message: "Contact created", contact }, { status: 201 });
};