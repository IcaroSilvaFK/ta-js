import crypto from "node:crypto";
import fs from "node:fs/promises";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import Service from "../src/service.js";

const MOCKED_HASH_PWD = "hashedpassword";

describe("#Service", () => {
  let _service;
  const filename = "testfile.ndjon";

  describe("#create - spies", () => {
    beforeEach(() => {
      jest.spyOn(crypto, crypto.createHash.name).mockReturnValue({
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValue(MOCKED_HASH_PWD),
      });

      jest.spyOn(fs, fs.appendFile.name).mockResolvedValue();

      _service = new Service({ filename });
    });

    it("should call appendFiel with right params", async () => {
      //AAA - Arrange, Act, Assert
      //Arrange
      const input = {
        username: "user1",
        pass: "pass1",
      };
      const expectedCreatedAt = new Date().toISOString();
      jest
        .spyOn(Date.prototype, Date.prototype.toISOString.name)
        .mockReturnValue(expectedCreatedAt);

      //Act

      await _service.create(input);
      //Assert
      expect(crypto.createHash).toHaveBeenCalledTimes(1);
      expect(crypto.createHash).toHaveBeenCalledWith("sha256");

      const hash = crypto.createHash("sha256");
      expect(hash.update).toHaveBeenCalledWith(input.pass);
      expect(hash.digest).toHaveBeenCalledWith("hex");

      const { pass, ...rest } = input;
      const expected = JSON.stringify({
        ...rest,
        password: MOCKED_HASH_PWD,
        createdAt: expectedCreatedAt,
      }).concat("\n");

      expect(fs.appendFile).toHaveBeenCalledWith(filename, expected);
    });
  });
});
