import JWT from 'jsonwebtoken';

export const publicSignature = () => {
  const secret = process.env.NEXT_PUBLIC_JWT_SIGNATURE_TOKEN;
  const id = process.env.NEXT_PUBLIC_JWT_SIGNATURE_ID;
  
  if (!secret || !id) throw new Error('JWT secret or ID not configured');

  const token = JWT.sign({ id }, secret, { expiresIn: '3s' }); // 3 seconds
  return token;
};
