import { afterAll, beforeAll, describe, expect, it, jest } from "@jest/globals";

import { randomUUID } from "node:crypto";
import { server } from "../src/api.js";

function waitForServerStatus(server) {
  return new Promise((resolve, reject) => {
    server.once("error", (err) => reject(err));
    server.once("listening", (details) => resolve(details));
  });
}

/*
  - Deve cadastrar usuarios e definir uma categoria onde:
    - Jovens Adultos:
      - Usuários de 18-25
    - Adultos:
      - Usuarios de 26-50
    - Idosos:
      - 50+
    - Menor:
      - Estoura um erro!  
*/
describe("API Users E2E Suite", () => {
  let _testServer;
  let _testServerAddress;

  beforeAll(async () => {
    _testServer = server.listen();

    await waitForServerStatus(_testServer);

    const serverInfo = _testServer.address();
    _testServerAddress = `http://localhost:${serverInfo.port}`;
  });

  afterAll((done) => {
    // para Deixar o jest mais rapido
    server.closeAllConnections();
    _testServer.close(done);
  });

  async function createUser(data) {
    return fetch(`${_testServerAddress}/users`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async function findUserById(id) {
    const user = await fetch(`${_testServerAddress}/users/${id}`);
    return user.json();
  }

  it("should register a new user with youn-adult category", async () => {
    const expectedCategory = "young-adult";

    // importante pois o ano que vem o teste pode quebrar
    //sempre que usar datas, sempre mockar o tempo!
    jest.useFakeTimers({
      now: new Date("2023-11-23T00:00"),
    });

    const response = await createUser({
      name: "Icaro Vieira",
      birthDay: "2000-01-01", // 21 anos
    });

    expect(response.status).toBe(201);
    const result = await response.json();

    expect(result.id).not.toBeUndefined();

    const user = await findUserById(result.id);

    expect(user.category).toBe(expectedCategory);
  });
  it("should register a new user with adult category", async () => {
    const expectedCategory = "adult";

    // importante pois o ano que vem o teste pode quebrar
    //sempre que usar datas, sempre mockar o tempo!
    jest.useFakeTimers({
      now: new Date("2023-11-23T00:00"),
    });

    const response = await createUser({
      name: "Icaro Vieira",
      birthDay: "1995-01-01", // 21 anos
    });

    expect(response.status).toBe(201);
    const result = await response.json();

    expect(result.id).not.toBeUndefined();

    const user = await findUserById(result.id);

    expect(user.category).toBe(expectedCategory);
  });
  it("should register a new user with senior category", async () => {
    const expectedCategory = "senior";

    // importante pois o ano que vem o teste pode quebrar
    //sempre que usar datas, sempre mockar o tempo!
    jest.useFakeTimers({
      now: new Date("2023-11-23T00:00"),
    });

    const response = await createUser({
      name: "Icaro Vieira",
      birthDay: "1970-01-01", // 21 anos
    });

    expect(response.status).toBe(201);
    const result = await response.json();

    expect(result.id).not.toBeUndefined();

    const user = await findUserById(result.id);

    expect(user.category).toBe(expectedCategory);
  });
  it("should throw an error when registering a under-age user", async () => {
    const response = await createUser({
      name: "Icaro Vieira",
      birthDay: "2018-01-01", // 21 anos
    });

    expect(response.status).toBe(400);

    const data = await response.json();

    expect(data.message).toEqual("User must be 18yo or older");
  });

  it("Should return status 404 when user not exists in database", async () => {
    const expectedCategory = "young-adult";

    // importante pois o ano que vem o teste pode quebrar
    //sempre que usar datas, sempre mockar o tempo!
    jest.useFakeTimers({
      now: new Date("2023-11-23T00:00"),
    });

    const user = await createUser({
      name: "Icaro Vieira",
      birthDay: "2000-01-01", // 21 anos
    });
    const userData = await user.json();
    const response = await fetch(`${_testServerAddress}/users/${userData.id}`);

    expect(response.status).toBe(200);
    const data = await response.json();

    expect(data.name).toBe("Icaro Vieira");
    expect(data.category).toBe(expectedCategory);
  });

  it("Should return status 200 when user exists in database", async () => {
    const invalidId = randomUUID();

    const response = await fetch(`${_testServerAddress}/users/${invalidId}`);

    expect(response.status).toBe(404);
  });
});
