import { describe, it, jest, expect } from "@jest/globals";

import View from "../../public/src/view.js";

describe("View test suite", () => {
  it("#updateList should append content to card-list innerHTML", () => {
    const innerHTMLSpy = jest.fn();
    const baseHTML = "<div><div/>";
    const querySelectorProxy = new Proxy(
      {
        innerHTML: baseHTML,
      },
      {
        set(obj, key, value) {
          obj[key] = value;
          innerHTMLSpy(obj[key]);
          return true;
        },
      }
    );

    jest
      .spyOn(document, document.querySelector.name)
      .mockImplementation((key) => {
        if (key !== "#card-list") return;

        return querySelectorProxy;
      });

    const view = new View();
    const data = {
      title: "title",
      imageUrl: "https://img.com/img.png",
    };

    const generatedContent = `
        <article class="col-md-12 col-lg-4 col-sm-3 top-30">
                <div class="card">
                    <figure>
                        <img class="card-img-top card-img"
                            src="${data.imageUrl}"
                            alt="Image of an ${data.title}">
                        <figcaption>
                            <h4 class="card-title">${data.title}</h4>
                        </figcaption>
                    </figure>
                </div>
            </article>
        `;

    view.updateList([data]);

    expect(innerHTMLSpy).toHaveBeenNthCalledWith(
      1,
      baseHTML + generatedContent
    );
    view.updateList([data]);

    expect(innerHTMLSpy).toHaveBeenNthCalledWith(
      2,
      baseHTML + generatedContent + generatedContent
    );
  });

  it("should validate params from addEventListener", () => {
    const mockElement = document.createElement("form");
    const addEventFn = jest.fn();
    const submitFn = jest.fn();

    jest
      .spyOn(mockElement, "addEventListener")
      .mockImplementationOnce((event, handler, options) =>
        addEventFn(event, submitFn, options)
      );

    jest.spyOn(document, "querySelectorAll").mockReturnValue([mockElement]);

    const view = new View();

    view.initialize();

    expect(addEventFn).toBeCalled();
    expect(addEventFn).toHaveBeenCalledWith("submit", submitFn, false);
  });

  it("should a validate onSubmit function", () => {
    const mockElement = document.createElement("form");
    const addEventFn = jest.fn();
    const submitFn = jest.fn();
    const focusFn = jest.fn();

    const title = document.createElement("input");
    title.type = "text";
    title.id = "title";
    title.value = "";

    const imageUrl = document.createElement("input");
    title.type = "text";
    title.id = "imageUrl";
    imageUrl.value = "";

    mockElement.appendChild(title);
    mockElement.appendChild(imageUrl);

    jest.spyOn(title, "checkValidity").mockReturnValue(false);
    jest.spyOn(title, "focus").mockImplementation(focusFn);
    jest.spyOn(imageUrl, "checkValidity").mockImplementation(false);
    jest.spyOn(imageUrl, "focus").mockImplementation(focusFn);

    jest
      .spyOn(mockElement, "addEventListener")
      .mockImplementationOnce((event, handler, options) =>
        addEventFn(event, submitFn, options)
      );

    jest.spyOn(document, "querySelectorAll").mockReturnValue([mockElement]);

    const eventSubmit = new Event("submit", {
      bubbles: true,
      cancelable: true,
    });

    mockElement.dispatchEvent(eventSubmit);
    console.log("chamow", eventSubmit.called);
    expect(submitFn).toBeCalled();
  });
});
