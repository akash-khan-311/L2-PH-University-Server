import jwt, { Secret, SignOptions } from "jsonwebtoken";

export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: Secret,
  expiresIn: string
) => {
  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions["expiresIn"],
  };

  return jwt.sign(jwtPayload, secret, options);
};
