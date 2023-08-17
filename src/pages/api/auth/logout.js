import { cookieSetter } from "../../../../utils/features";
const { asyncError, errorHandler } = require("../../../../utils/error");

const handler = asyncError(async (req, res) => {
  if (req.method !== "GET") {
    return errorHandler(res, 400, "Method not allowed");
  }
  cookieSetter(res, null, false);
  res.status(200).json({ success: true, message: ` Logout Successfully` });
});
export default handler;
