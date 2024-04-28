import { afterAll, beforeAll, describe, expect, it, jest } from "@jest/globals";

// import server from "../src/index.js";

function waitForServerStatus(server) {
  return new Promise((resolve, reject) => {
    server.once("error", (err) => reject(err));
    server.once("listening", (err) => resolve(err));
  });
}

describe("E2E test suite", () => {
  describe("E2E tests for server in a non-test env", () => {
    it("should start serve with port 4000", async () => {
      const PORT = 4000;
      process.env.NODE_ENV = "production";
      process.env.PORT = PORT;
      jest.spyOn(console, console.log.name);

      const { default: server } = await import("../src/index.js");
      await waitForServerStatus(server);

      const serverInfo = server.address();

      expect(serverInfo.port).toBe(PORT);
      expect(console.log).toHaveBeenCalledWith(
        `server is running at ${serverInfo.address}:${serverInfo.port}`
      );

      return new Promise((resolve) => server.close(resolve));
    });
  });

  describe("E2E tests for server", () => {
    let _testServer;
    let _serverAddress;

    beforeAll(async () => {
      process.env.NODE_ENV = "test";
      const { default: server } = await import("../src/index.js");

      _testServer = server.listen();
      await waitForServerStatus(_testServer);
      const serverInfo = _testServer.address();
      _serverAddress = `http://localhost:${serverInfo.port}`;
    });

    afterAll((done) => {
      _testServer.close(done);
    });

    it("should return 404 for unsupported routes", async () => {
      const response = await fetch(`${_serverAddress}/unsupported`, {
        method: "POST",
      });

      expect(response.status).toBe(404);
    });
    it("should return 400 and missing a field message when body is invalid name is not provided", async () => {
      const invalidPerson = {
        // name: "",
        cpf: "123.123.123-12",
      };
      const response = await fetch(`${_serverAddress}/persons`, {
        method: "POST",
        body: JSON.stringify(invalidPerson),
      });

      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body.validationError).toEqual("name is required");
    });

    it("should return 400 and missing a field message when body is invalid cpf is not provided", async () => {
      const invalidPerson = {
        name: "teste da silva",
        // missing cpf
      };
      const response = await fetch(`${_serverAddress}/persons`, {
        method: "POST",
        body: JSON.stringify(invalidPerson),
      });
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body.validationError).toEqual("cpf is required");
    });

    it("should create new person with status 201", async () => {
      const validPerson = {
        name: "Icaro Vieira",
        cpf: "123.123.123-12",
      };

      const response = await fetch(`${_serverAddress}/persons`, {
        method: "POST",
        body: JSON.stringify(validPerson),
      });

      expect(response.status).toBe(201);
      const body = await response.json();
      expect(body.result).toBe("ok");
    });

    it("Should return status 500 with invalid request", async () => {
      const validPerson = {
        name: "Icaro",
        cpf: "123.123.123-12",
      };

      const response = await fetch(`${_serverAddress}/persons`, {
        method: "POST",
        body: JSON.stringify(validPerson),
      });

      expect(response.status).toBe(500);
    });
  });
});
