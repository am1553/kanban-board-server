import pool from "../db.js";
export const createBoard = async (req, res) => {
  try {
    const { user } = req;
    console.log(user);
    const { title } = req.body;
    const newBoard = await pool.query(
      "INSERT INTO boards (title, user_id) VALUES($1, $2) RETURNING *",
      [title, user.id]
    );
    res.json(newBoard.rows);
  } catch (error) {
    console.error("Error creating board:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBoards = async (req, res) => {
  try {
    const { user } = req;
    const allBoards = await pool.query(
      "SELECT id, title FROM boards WHERE user_id = $1",
      [user.id]
    );
    res.json(allBoards.rows);
  } catch (error) {
    console.error("Error getting all boards:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const board = await pool.query(
      "SELECT id, title FROM boards WHERE id = $1",
      [id]
    );
    res.json(board.rows[0]);
  } catch (error) {
    console.error("Error getting board:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const updateBoard = await pool.query(
      "UPDATE boards SET title = $1 WHERE id = $2 RETURNING id, title",
      [title, id]
    );
    res.json(updateBoard.rows[0]);
  } catch (error) {
    console.error("Error updating board:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBoard = await pool.query("DELETE FROM boards WHERE id = $1", [
      id,
    ]);
    res.json(deleteBoard.rows);
  } catch (error) {
    console.error("Error deleting board:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
