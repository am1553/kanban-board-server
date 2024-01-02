import pool from "../db.js";

export const createColumn = async (req, res) => {
  const { title, board_id, color } = req.body;
  const board = await pool.query("SELECT * FROM boards WHERE id = $1", [
    board_id,
  ]);
  if (board.rows.length < 1) {
    return res.json({ message: "Board doesn't exist." });
  }
  try {
    const column = await pool.query(
      "INSERT INTO columns (title, color, board_id) VALUES ($1, $2, $3) RETURNING id, title, color",
      [title, color, board_id]
    );
    res.json(column.rows);
  } catch (error) {
    console.error(error);
  }
};

export const getColumns = async (req, res) => {
  const { board_id } = req.body;
  try {
    const columns = await pool.query(
      "SELECT id, title, color FROM columns WHERE board_id = $1",
      [board_id]
    );
    res.json(columns.rows);
  } catch (error) {
    console.error(error.message);
  }
};

export const getColumn = async (req, res) => {
  const { id } = req.params;
  try {
    const column = await pool.query(
      "SELECT id, title, color FROM columns where id = $1",
      [id]
    );

    res.json(column.rows[0]);
  } catch (error) {
    console.error(error);
  }
};

export const updateColumn = async (req, res) => {
  const { id } = req.params;
  const { title, color, board_id } = req.body;
  try {
    const column = await pool.query(
      "UPDATE columns SET title = $1, color = $2, board_id = $3 WHERE id = $4 RETURNING title, color, board_id",
      [title, color, board_id, id]
    );
    res.json(column.rows[0]);
  } catch (error) {
    console.error(error);
  }
};

export const deleteColumn = async (req, res) => {
  const { id } = req.params;
  try {
    const column = await pool.query("DELETE FROM columns WHERE id=$1", [id]);
    res.json({ message: "Column deleted." });
  } catch (error) {
    console.error(error.message);
  }
};
