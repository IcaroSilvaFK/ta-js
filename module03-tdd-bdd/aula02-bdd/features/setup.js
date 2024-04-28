import { Given, AfterAll } from "@cucumber/cucumber";
import { server } from "../src/api.js";
import sinon from "sinon";

function waitForServerStatus(server) {
  return new Promise((resolve, reject) => {
    server.once("error", (err) => reject(err));
    server.once("listening", () => resolve());
  });
}

let _testServer;

Given("I have a running server", async function () {
  if (_testServer) {
    const serverInfo = _testServer.address();
    this.testServerAddress = `http://localhost:${serverInfo.port}`;
    return;
  }
  _testServer = server.listen();

  await waitForServerStatus(_testServer);

  const serverInfo = _testServer.address();
  this.testServerAddress = `http://localhost:${serverInfo.port}`;
});

AfterAll(function (done) {
  sinon.restore();
  server.closeAllConnections();
  _testServer.close(done);
});

Given("The current date is {string}", async function (date) {
  sinon.restore();
  const clock = sinon.useFakeTimers(new Date(date).getTime());
  this.clock = clock;
});
