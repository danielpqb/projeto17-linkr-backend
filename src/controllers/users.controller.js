import db from "../database/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

async function postSignUpUser(req, res) {
  const { name, email, password, imageUrl } = req.body;

  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    const find_email = await db.query("SELECT * FROM users WHERE email=$1;", [
      email,
    ]);
    if (find_email.rowCount > 0) {
      res.status(409).send({ message: "Email already in use." });
      return;
    }

    await db.query(
      `INSERT INTO users (name, email, password, "imageUrl") VALUES ($1, $2, $3, $4);`,
      [name, email, passwordHash, imageUrl]
    );
    res.status(201).send({ message: "User registered." });
    return;
  } catch (error) {
    res.status(500).send(error);
    return;
  }
}

async function postSignInUser(req, res) {
  const { email, password } = req.body;
  const token = uuid();

  try {
    //User exists?
    const find_user = await db.query("SELECT * FROM users WHERE email=$1;", [
      email,
    ]);
    if (find_user.rowCount <= 0) {
      res.status(401).send({ message: "Incorrect user/password." });
      return;
    }

    //Incorrect password?
    const user = find_user.rows[0];
    if (!bcrypt.compareSync(password, user.password)) {
      res.status(401).send({ message: "Incorrect user/password." });
      return;
    }

    await db.query(`INSERT INTO sessions("userId", token) VALUES ($1, $2);`, [
      user.id,
      token,
    ]);
    res.status(200).send({ message: "You have loged in.", token: token });
    return;
  } catch (error) {
    res.status(500).send(error);
    return;
  }
}

export { postSignUpUser, postSignInUser };
