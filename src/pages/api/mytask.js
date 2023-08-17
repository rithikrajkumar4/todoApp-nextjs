import { connetDB } from "../../../utils/features";
import { Task } from "../../../models/task";
import { asyncError, errorHandler } from "../../../utils/error";
import { checkAuth } from "../../../utils/isauthenticated";

const handler = asyncError(async (req, res) => {
  if (req.method !== "GET")
    return errorHandler(res, 400, "Method not supported");

  await connetDB();

  const user = await checkAuth(req);
  //   console.log(user);
  if (!user) return errorHandler(res, 401, "Unauthorized, Login First");
  const tasks = await Task.find({
    user: user._id,
  });

  res.json({
    success: true,
    tasks,
  });
});
export default handler;
