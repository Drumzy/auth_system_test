import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import * as bodyParser from "body-parser";
import { User } from "./schemas/user.schema";

dotenv.config();

const app: Express = express();
const prisma = new PrismaClient();
const port = process.env.PORT;
app.use(bodyParser.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Express 1 + Typescript Server is running");
});

app.post("/add_user", async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  const verification = User.safeParse(req.body);

  if (!verification.success) {
    return res.json({ error: verification.error });
  }

  await prisma.user
    .create({
      data: {
        email,
        username,
        password,
      },
    })
    .then((user) =>
      res.json({ message: "User added successfully", user: user })
    )
    .catch((reason) => {
      res.json({ error: reason });
    });
});

app.listen(port, () => {
  console.log(`[Server]: running at http://localhost:${port}`);
});
