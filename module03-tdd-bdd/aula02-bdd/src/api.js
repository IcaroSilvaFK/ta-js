import { randomUUID } from "node:crypto";
import { once } from "node:events";
import { createServer } from "node:http";

const usersDb = [];

function getUserCategory(birthDay) {
  const age = new Date().getFullYear() - new Date(birthDay).getFullYear();

  if (age < 18) {
    throw new Error("User must be 18yo or older");
  }
  if (age >= 18 && age <= 25) {
    return "young-adult";
  }
  if (age > 25 && age <= 50) {
    return "Adult";
  }

  return "senior";
}

const server = createServer(async (req, res) => {
  if (req.url === "/users" && req.method === "POST") {
    try {
      const user = JSON.parse(await once(req, "data"));

      const updatedUser = {
        id: randomUUID(),
        ...user,
        category: getUserCategory(user.birthDay),
      };
      usersDb.push(updatedUser);

      res.writeHead(201, {
        "Content-Type": "application/json",
      });
      return res.end(
        JSON.stringify({
          id: updatedUser.id,
        })
      );
    } catch (err) {
      if (err.message.includes("18yo")) {
        res.writeHead(400, {
          "Content-Type": "application/json",
        });
        res.end(
          JSON.stringify({
            message: err.message,
          })
        );
        return;
      }
      res.writeHead(500);
      res.end();
      return;
    }
  }

  if (req.url.startsWith("/users") && req.method === "GET") {
    const id = req.url.split("/");
    const user = usersDb.find((u) => u.id === id.at(-1));

    if (!user) {
      res.writeHead(404);
      return res.end(
        JSON.stringify({
          message: "User epecified not exists",
        })
      );
    }
    res.end(JSON.stringify(user));
    return;
  }
  res.end("hello world!");
});

export { server };
