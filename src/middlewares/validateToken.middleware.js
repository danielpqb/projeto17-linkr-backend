import db from "../database/database.js";

const validateToken = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth === undefined) {
    res.status(401).send({ message: "Nonexistent Authorization." });
    return;
  }
  if (!auth.includes("Bearer ")) {
    res.status(401).send({ message: "Invalid Authorization format." });
    return;
  }

  const token = auth.replace("Bearer ", "");

  const session = (
    await db.query("SELECT * FROM sessions WHERE token=$1;", [token])
  ).rows[0];
  if (!session) {
    res.status(404).send({ message: "No session for this token." });
    return;
  }

  const user = (
    await db.query("SELECT * FROM users WHERE id=$1;", [session.user_id])
  ).rows[0];
  if (!user) {
    res
      .status(404)
      .send({ message: "No user for this user_id from sessions." });
    return;
  }

  res.locals.user = user;
  next();
};

export { validateToken };
