import { Router } from "express";
import {
  createBoard,
  deleteBoard,
  getBoard,
  getBoards,
  updateBoard,
} from "./handlers/boards.js";
import {
  createColumn,
  deleteColumn,
  getColumn,
  getColumns,
  updateColumn,
} from "./handlers/columns.js";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "./handlers/tasks.js";
import {
  createSubtask,
  deleteSubtask,
  getSubtask,
  getSubtasks,
  updateSubtask,
} from "./handlers/subtasks.js";

const router = Router();

// boards
router.post("/boards", createBoard);
router.get("/boards", getBoards);
router.get("/boards/:id", getBoard);
router.put("/boards/:id", updateBoard);
router.delete("/boards/:id", deleteBoard);

// columns
router.post("/columns", createColumn);
router.get("/columns", getColumns);
router.get("/columns/:id", getColumn);
router.put("/columns/:id", updateColumn);
router.delete("/columns/:id", deleteColumn);

// tasks
router.post("/tasks", createTask);
router.get("/tasks", getTasks);
router.get("/tasks/:id", getTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

// subtasks
router.post("/subtasks", createSubtask);
router.get("/subtasks", getSubtasks);
router.get("/subtasks/:id", getSubtask);
router.put("/subtasks/:id", updateSubtask);
router.delete("subtasks/:id", deleteSubtask);

export default router;
