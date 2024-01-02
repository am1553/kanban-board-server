import pool from "../db.js";

export const createSubtask = async (req, res) => {
  const { title, task_id } = req.body;
  try {
    const subtask = await pool.query(
      "INSERT INTO subtasks (title, task_id) VALUES($1, $2) RETURNING *",
      [title, task_id]
    );
    res.json(subtask.rows);
  } catch (error) {
    console.error(error);
  }
};

export const getSubtasks = async (req, res) => {
  const { task_id } = req.body;
  try {
    const subtask = await pool.query("SELECT * FROM tasks WHERE task_id=$1", [
      task_id,
    ]);
    res.json(subtask.rows);
  } catch (error) {
    console.error(error);
  }
};

export const getSubtask = async (req, res) => {
  const { id } = req.params;
  try {
    const subtask = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
    res.json(subtask.rows[0]);
  } catch (error) {
    console.error(error);
  }
};

export const updateSubtask = async (req, res) => {
  const { id } = req.params;
  const { title, isComplete } = req.body;
  try {
    const task = await pool.query(
      "UPDATE subtasks SET title = $1, isComplete = $2 WHERE id = $3 RETURNING *",
      [title, isComplete, id]
    );
    res.json(task.rows[0]);
  } catch (error) {
    console.error(error);
  }
};

export const deleteSubtask = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM subtasks WHERE id = $1", [id]);
    res.json("Subtask deleted");
  } catch (error) {
    console.error(error);
  }
};
