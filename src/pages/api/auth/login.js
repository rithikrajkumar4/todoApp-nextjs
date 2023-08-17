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
  const { email, password } = req.body;
  if (!email || !password) {
    return errorHandler(res, 400, "All fields are required");
  }
  await connetDB();
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return errorHandler(res, 400, "User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return errorHandler(res, 400, "Invalid password");
  }
  const token = generateToken(user._id);
  cookieSetter(res, token, true);
  res
    .status(200)
    .json({ success: true, message: `${user.name} Login Success`, user });
});
export default handler;
