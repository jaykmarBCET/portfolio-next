import JWT from "jsonwebtoken"

export const generateToken = (id:string)=>{
    return JWT.sign({id},process.env.JWT_SECRET_KEY!,{expiresIn:7*24*60*60*1000})
}