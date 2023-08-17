import { User } from "../../../../models/user";
import {
  connetDB,
  cookieSetter,
  generateToken,
} from "../../../../utils/features";
const { asyncError, errorHandler } = require("../../../../utils/error");
import bcrypt from "bcrypt";

const handler = asyncError(async (req, res) => {
  if (req.method !== "POST") {
    return errorHandler(res, 400, "Method not allowed");
  }
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return errorHandler(res, 400, "All fields are required");
  }
  await connetDB();
  let user = await User.findOne({ email });
  if (user) {
    return errorHandler(res, 400, "Email already in use");
  }
  const hashedpassword = await bcrypt.hash(password, 10);

  user = await User.create({ name, email, password: hashedpassword });
  const token = generateToken(user._id);
  cookieSetter(res, token, true);
  res
    .status(201)
    .json({ success: true, message: "User created successfully", user });
});
export default handler;
