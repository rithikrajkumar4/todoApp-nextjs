import { Task } from "../../../../models/task";
import { asyncError, errorHandler } from "../../../../utils/error";
import { connetDB } from "../../../../utils/features";
import { checkAuth } from "../../../../utils/isauthenticated";

const handler = asyncError(async (req, res) => {
  await connetDB();
  const user = await checkAuth(req);
  if (!user) return errorHandler(res, 401, "Unauthorized, Login First");
  const taskId = req.query.id;
  const task = await Task.findById(taskId);
  if (!task) return errorHandler(res, 404, "Task Not Found");
  if (req.method === "PUT") {
    task.isCompleted = !task.isCompleted;
    await task.save();
    return res
      .status(200)
      .json({ success: true, message: "Task Updated Success" });
  } else if (req.method === "DELETE") {
    await task.deleteOne();
    return res
      .status(200)
      .json({ success: true, message: "Task Deleted Successfully" });
  } else {
    errorHandler(req, 400, "Only Put and Delete");
  }
});
export default handler;
