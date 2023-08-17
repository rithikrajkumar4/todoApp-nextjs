import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
export const connetDB = async () => {
  console.log(process.env.MONGO_URI);
  const { connection } = await mongoose.connect(process.env.MONGO_URI, {
    dbName: "NEXTTODO",
  });
  console.log(`Database Connected on connection: ${connection.host}`);
};

export const cookieSetter = (res, token, set) => {
  res.setHeader(
    "Set-Cookie",
    serialize("userToken", set ? token : "", {
      path: "/",
      httpOnly: true,
      maxAge: set ? 1000 * 60 * 60 * 24 * 15 : 0,
    })
  );
};
export const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET);
};
