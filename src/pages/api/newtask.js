import { connetDB } from "../../../utils/features";
import { Task } from "../../../models/task";
import { asyncError, errorHandler } from "../../../utils/error";
import { checkAuth } from "../../../utils/isauthenticated";

const handler = asyncError(async (req, res) => {
  if (req.method !== "POST")
    return errorHandler(res, 400, "Post only supported");

  await connetDB();

  const { title, description } = req.body;
  if (!title || !description)
    return errorHandler(res, 400, "All fields not Exist");
  const user = await checkAuth(req);
  if (!user) return errorHandler(res, 400, "Login required");

  // console.log(title, description);
  await Task.create({
    title,
    description,
    user: user._id,
  });

  res.json({
    success: true,
    message: "Task created successfully",
  });
});
export default handler;
