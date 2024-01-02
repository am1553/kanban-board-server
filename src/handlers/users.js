import pool from "../db.js";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth.js";

export const createUser = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const hashedPasswordhash = await hashPassword(password);
  try {
    // if email address already exists then dont create a new user
    const userExists = await pool.query(
      "SELECT * FROM users WHERE (email) = $1",
      [email]
    );
    if (userExists.rows.length < 1) {
      const user = await pool.query(
        "INSERT INTO users (email, password, first_name, last_name) VALUES($1, $2, $3, $4) RETURNING *",
        [email, hashedPasswordhash, firstName, lastName]
      );
      const token = createJWT(user);
      return res.json({ token, user });
    } else {
      console.log("user already exists");
      return res.json("User with the email address already exists.");
    }
  } catch (error) {
    return res.json(error.message);
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users where (email) = $1", [
      email,
    ]);
    const data = user.rows[0];
    if (user.rows.length < 1) {
      return res.json({ message: "No user found with the email address." });
    }

    const isValidPassword = await comparePasswords(
      password,
      user.rows[0].password
    );
    if (!isValidPassword) {
      return res.json({ message: "Invalid password" });
    }

    const token = createJWT(user);
    return res.json({ token, user: data });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await pool.query("DELETE FROM users WHERE id = $1", [id]);
    return res.json("User deleted");
  } catch (error) {
    console.error(error.message);
  }
};
