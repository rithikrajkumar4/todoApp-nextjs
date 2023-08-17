import { checkAuth } from "../../../../utils/isauthenticated";

const { asyncError, errorHandler } = require("../../../../utils/error");

const handler = asyncError(async (req, res) => {
  if (req.method !== "GET") {
    return errorHandler(res, 400, "Method not allowed");
  }
  const user = await checkAuth(req);
  //   console.log(user);
  if (!user) return errorHandler(res, 401, "Unauthorized, Login First");
  res.status(200).json({ success: true, user });
});
export default handler;
