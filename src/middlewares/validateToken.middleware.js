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

  const user = (await db.query("SELECT * FROM users WHERE token=$1;", [token]))
    .rows[0];
  if (!user) {
    res.status(404).send({ message: "No user for this token." });
    return;
  }

  res.locals.user = user;
  next();
};

export { validateToken };
