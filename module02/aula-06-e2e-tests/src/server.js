import { once } from "node:events";
import { createServer } from "node:http";
import Person from "./person.js";

const server = createServer(async (req, res) => {
  if (req.method !== "POST" || req.url !== "/persons") {
    res.writeHead(404);
    res.end();
    return;
  }

  try {
    const data = (await once(req, "data")).toString();
    const result = Person.process(JSON.parse(data));
    res.writeHead(201);
    return res.end(JSON.stringify({ result }));
  } catch (err) {
    if (err.message.includes("required")) {
      res.writeHead(400);
      res.write(
        JSON.stringify({
          validationError: err.message,
        })
      );
      return res.end();
    }
    console.error("deu ruim", err);
    res.writeHead(500);
    res.end();
  }
});

export default server;
