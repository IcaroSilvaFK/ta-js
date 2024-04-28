import fs from "node:fs/promises";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";

import fsSync from "node:fs";
import NotFoundFileError from "../src/errors/NotFoundFile.js";
import Service from "../src/service.js";

describe("#Service", () => {
  let _service;
  const filename = "testfile.ndjon";

  beforeEach(() => {
    _service = new Service({ filename });
  });

  describe("#read", () => {
    it("should throw new Not found file error when file no exists", async () => {
      jest.spyOn(fs, "readFile").mockRejectedValue("");
      jest.spyOn(fsSync, fsSync.existsSync.name).mockReturnValue(false);

      const result = await _service.read();
      expect(result).toEqual([]);
    });

    it("should return an empty array if the file is empty", async () => {
      jest.spyOn(fs, "readFile").mockResolvedValue("");
      jest.spyOn(fsSync, fsSync.existsSync.name).mockReturnValue(true);

      const result = await _service.read();

      expect(result).toEqual([]);
    });

    it("should return user without password if file contains users", async () => {
      const dbData = [
        {
          username: "user1",
          password: "pass1",
          createdAt: new Date().toISOString(),
        },
        {
          username: "user2",
          password: "pass2",
          createdAt: new Date().toISOString(),
        },
      ];

      const fileContents = dbData
        .map((item) => JSON.stringify(item).concat("\n"))
        .join("");

      jest.spyOn(fs, "readFile").mockResolvedValue(fileContents);
      jest.spyOn(fsSync, fsSync.existsSync.name).mockReturnValue(true);

      const result = await _service.read();

      const expected = dbData.map(({ password, ...rest }) => rest);

      expect(result).toStrictEqual(expected);
    });
  });
});
