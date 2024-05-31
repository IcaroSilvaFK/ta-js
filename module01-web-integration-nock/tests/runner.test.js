import { expect, it, describe } from "@jest/globals";
import { requestApiByPage } from "../src/runner.js";
import page01Fixures from "../fixures/get-page1.json";
import page02Fixures from "../fixures/get-page2.json";

// como o global.fetch não faz chamadas usando
// o http.request ou http.ClientRequest
// instalamos o axios para fazer requisições
import nock from "nock";

describe("Web Integration Test Suite", () => {
  it("Should return the right object with right properties", async () => {
    const scope = nock("https://rickandmortyapi.com/api/")
      .get("/character/")
      .query({ page: 1 })
      .reply(200, page01Fixures);

    const page01 = await requestApiByPage();

    expect(page01).toEqual(page01Fixures);
    scope.done();
  });
});
