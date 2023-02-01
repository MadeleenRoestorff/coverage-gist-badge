const main = require("../index");
const { Octokit } = require("@octokit/core");

jest.mock("@octokit/core");

describe("Test main gist update function.", () => {
  beforeEach(() => {
    Octokit.mockClear();
  });

  afterEach(() => {
    Octokit.mockRestore();
    process.env.INPUT_AUTH = "";
    process.env.INPUT_COLOR = "";
  });

  it("Test if the class constructor for Octokit has been called", async () => {
    expect(Octokit).not.toHaveBeenCalled();
    process.env.INPUT_MESSAGE = "50%";
    process.env.INPUT_AUTH = "BUNNY";
    process.env.INPUT_COLOR = "pink";
    await main();
    expect(Octokit).toHaveBeenCalledTimes(1);
  });

  it.each(["40%", "50%", "60%", "70%", "80%", "90%"])(
    "Mock implement the request method on the Octokit class with %p messages",
    async (message) => {
      process.env.INPUT_GISTID = "";
      process.env.INPUT_AUTH = "BUNNY";
      process.env.INPUT_MESSAGE = message;
      process.env.INPUT_LABEL = "Coverage";
      process.env.INPUT_FILENAME = "test.json";
      process.env.INPUT_NAMEDLOGO = "jest";

      const request = () =>
        new Promise((resolve) => {
          resolve({
            status: 302,
            headers: { location: "mock-url" },
            data: { files: { "test.json": { content: "test" } } }
          });
        });

      Octokit.mockImplementation(() => ({ request }));
      await expect(main()).resolves;
      expect(Octokit).toHaveBeenCalledTimes(1);
    }
  );
});
