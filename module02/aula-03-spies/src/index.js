import Service from "./service.js";

const data = {
  username: `whyy-${Date.now()}`,
  pass: "minhasenha",
};

const service = new Service({
  filename: "./users.ndjson",
});

await service.create(data);

const users = await service.read();

console.log("users", users);
