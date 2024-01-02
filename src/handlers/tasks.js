import pool from "../db.js";

export const createTask = async (req, res) => {
  const { title, description, column_id, board_id } = req.body;

  try {
    const task = await pool.query(
      "INSERT INTO tasks (title, description, column_id, board_id) VALUES($1, $2, $3, $4) RETURNING *",
      [title, description, column_id, board_id]
    );
    res.json(task.rows);
  } catch (error) {
    console.error(error);
  }
};

export const getTasks = async (req, res) => {
  const { board_id } = req.body;

  try {
    const tasks = await pool.query("SELECT * FROM tasks WHERE board_id=$1", [
      board_id,
    ]);
    res.json(tasks.rows);
  } catch (error) {
    console.error(error);
  }
};

export const getTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
    res.json(task.rows[0]);
  } catch (error) {
    console.error(error);
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, column_id, board_id } = req.body;
  try {
    const task = await pool.query(
      "UPDATE tasks SET title = $1, description = $2, column_id = $3, board_id = $4 WHERE id = $5 RETURNING *",
      [title, description, column_id, board_id, id]
    );
    res.json(task.rows[0]);
  } catch (error) {
    console.error(error);
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    res.json("Task deleted");
  } catch (error) {
    console.error(error);
  }
};
