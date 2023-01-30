const core = require("@actions/core");
const { Octokit } = require("@octokit/core");

exports.lib = async () => {
  try {
    const content = {
      schemaVersion: 1,
      label: core.getInput("label"),
      message: core.getInput("message")
    };

    const color = core.getInput("color");
    const filename = core.getInput("filename");
    const namedLogo = core.getInput("namedLogo");
    const percantage = Number(content.message.replace("%", ""));

    // If statement would have been 180% faster
    switch (color === "" ? true : "") {
      case percantage >= 90:
        content.color = "brightgreen";
        break;
      case percantage >= 80:
        content.color = "green";
        break;
      case percantage >= 70:
        content.color = "yellowgreen";
        break;
      case percantage >= 60:
        content.color = "yellow";
        break;
      case percantage >= 50:
        content.color = "orange";
        break;
      case percantage < 50:
        content.color = "red";
        break;
      default:
        content.color = "pink";
        break;
    }

    if (namedLogo !== "") {
      content.namedLogo = namedLogo;
    }

    const octokit = new Octokit({
      auth: core.getInput("auth", { required: true }),
      log: {
        warn: console.warn,
        error: console.error
      }
    });

    const response = await octokit.request("PATCH /gists/{gistID}", {
      gistID: core.getInput("gistID"),
      description: "An updated gist description",
      files: {
        [filename]: {
          content: JSON.stringify(content)
        }
      }
    });

    const { files } = response.data;
    core.setOutput("content", files[filename].content);
  } catch (error) {
    console.error(error.message);
    core.setFailed(error.message);
    process.exit(-1);
  }
};
