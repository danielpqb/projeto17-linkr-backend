import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { stripHtml } from "string-strip-html";

import * as repositories from "../repositories/users.repository.js";

async function postSignUpUser(req, res) {
  const { name, email, password, imageUrl } = req.body;

  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    const find_email = await repositories.getUserByEmail(email);
    if (find_email.rowCount > 0) {
      res.status(409).send({ message: "Email already in use." });
      return;
    }

    await repositories.createUser(name, email, passwordHash, imageUrl);
    res.status(201).send({ message: "User registered." });
    return;
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    return;
  }
}

async function postSignInUser(req, res) {
  const { email, password } = req.body;
  const token = uuid();

  try {
    //User exists?
    const find_user = await repositories.getUserByEmail(email);
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

    await repositories.createSession(user.id, token);
    res.status(200).send({ message: "You have loged in.", token: token });
    return;
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    return;
  }
}

async function getUserDataByToken(req, res) {
  const { user } = res.locals;

  res.status(200).send({
    message: `Welcome back, ${user.name}.`,
    id: user.id,
    name: user.name,
    email: user.email,
    imageUrl: user.imageUrl,
  });
  return;
}

async function getUsersWithFilter(req, res) {
  console.log(req.headers);
  if (!req.headers.filter) {
    res.sendStatus(400);
    return;
  } 

  try {
    const filter = stripHtml(req.headers.filter).result;
    const users = await repositories.getUsersWithFilter(filter);
    console.log(filter);
    res.send(users.rows);
  } catch (error) {
    res.sendStatus(500);
  }
}

export { postSignUpUser, postSignInUser, getUserDataByToken, getUsersWithFilter };
