import { describe, it } from "node:test";
import { deepStrictEqual, CallTracker } from "node:assert";
import Controller from "../src/controller.js";
import View from "../src/view.js";

const tracker = new CallTracker();

process.on("exit", () => tracker.verify());

const mockedData = [
  {
    name: "Morty smith",
    image: "https://",
    status: "Alive",
    age: 14,
    birtDay: new Date(),
  },
  {
    name: "Pickle rick",
    image: "https://",
    age: 80,
    birtDay: new Date(),
    status: "unknown",
  },
];

describe("Unit tests for frontend", () => {
  it("Should add a property if name contains smith and removel all other props", () => {
    const expected = [
      {
        name: "Morty smith",
        image: "https://",
        status: "Alive",
        isAlive: true,
      },
      {
        name: "Pickle rick",
        image: "https://",
        status: "unknown",
        isAlive: false,
      },
    ];
    const controller = new Controller({}, {});

    const result = controller.prepareItems(mockedData);

    deepStrictEqual(result, expected);
  });

  it("Should verify either all functions were called properly", async () => {
    let htmlResult = "";
    const globalObj = {
      document: {
        querySelector: tracker.calls(() => ({
          set innerHTML(value) {
            htmlResult = value;
          },
        })),
      },
    };

    globalThis = {
      ...globalThis,
      ...globalObj,
    };
    const service = {
      getChacracters: tracker.calls(() => mockedData),
    };
    const view = new View();

    view.updateTable = tracker.calls(view.updateTable);

    await Controller.initialize(service, view);

    const [{ arguments: serviceCall }] = tracker.getCalls(
      service.getChacracters
    );

    deepStrictEqual(serviceCall, [{ skip: 0, limit: 5 }]);
    const [{ arguments: viewCall }] = tracker.getCalls(view.updateTable);

    deepStrictEqual(viewCall, [
      [
        {
          isAlive: true,
          name: "Morty smith",
          image: "https://",
          status: "Alive",
        },
        {
          isAlive: false,
          name: "Pickle rick",
          image: "https://",
          status: "unknown",
        },
      ],
    ]);

    deepStrictEqual(
      htmlResult,
      "\n" +
        '        <li class="card">\n' +
        "          <img\n" +
        '            src="https://"\n' +
        '            alt="Morty smith"\n' +
        "            />\n" +
        "          <div>\n" +
        "            <b>Morty smith</b>\n" +
        '            <span class="">\n' +
        "            Alive\n" +
        "            </span>\n" +
        "          </div>\n" +
        "      </li>\n" +
        "\n" +
        '        <li class="card">\n' +
        "          <img\n" +
        '            src="https://"\n' +
        '            alt="Pickle rick"\n' +
        "            />\n" +
        "          <div>\n" +
        "            <b>Pickle rick</b>\n" +
        '            <span class="dead">\n' +
        "            unknown\n" +
        "            </span>\n" +
        "          </div>\n" +
        "      </li>"
    );
  });
});
