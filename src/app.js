import express from "express";
import cors from "cors";

import usersRoute from "./routes/users.route.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(usersRoute);

export default app;
