const main = require("../index");
const { Octokit } = require("@octokit/core");

jest.mock("@octokit/core");
let mockExit = jest.spyOn(process, "exit");

describe("foo", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    Octokit.mockClear();
    mockExit = jest.spyOn(process, "exit").mockImplementation((number) => {
      throw new Error(`process.exit: " + ${number}`);
    });
  });
  afterEach(() => {
    jest.restoreAllMocks();
    process.env.INPUT_AUTH = "";
    process.env.INPUT_COLOR = "";
  });

  it("Test if process exit", async () => {
    process.env.INPUT_MESSAGE = "90%";
    await expect(main()).rejects.toThrow();
    expect(mockExit).toHaveBeenCalledWith(-1);
  });

  it("Test if the class constructor for Octokit has been called", async () => {
    expect(Octokit).not.toHaveBeenCalled();
    process.env.INPUT_MESSAGE = "50%";
    process.env.INPUT_AUTH = "BUNNY";
    process.env.INPUT_COLOR = "pink";
    await expect(main()).rejects.toThrow();
    expect(Octokit).toHaveBeenCalledTimes(1);
  });

  it.each(["40%", "50%", "60%", "70%", "80%"])(
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
