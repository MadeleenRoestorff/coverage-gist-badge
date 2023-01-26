const core = require('@actions/core');
const { Octokit } = require('@octokit/core');

const main = async () => {
  const content = {
    schemaVersion: 1,
    label: core.getInput('label'),
    message: core.getInput('message'),
  };

  const color = core.getInput('color');
  const filename = core.getInput('filename');
  const namedLogo = core.getInput('namedLogo');
  const percantage = Number(core.getInput('message').replace('%', ''));

  console.log('percantage', percantage);

  if (color == '') {
    switch (percantage) {
      case percantage >= 90:
        content.color = 'brightgreen';
        break;
      case percantage >= 80:
        content.color = 'green';
        break;
      case percantage >= 70:
        content.color = 'yellowgreen';
        break;
      case percantage >= 60:
        content.color = 'yellow';
        break;
      case percantage >= 50:
        content.color = 'orange';
        break;
      case percantage < 50:
        content.color = 'red';
        break;
      default:
        content.color = 'pink';
        break;
    }
  } else {
    content.color = color;
  }

  if (namedLogo != '') {
    content.namedLogo = namedLogo;
  }

  const octokit = new Octokit({
    auth: core.getInput('auth'),
  });

  const response = await octokit.request('PATCH /gists/{gist_id}', {
    gist_id: core.getInput('gistID'),
    description: 'An updated gist description',
    files: {
      [filename]: {
        content: JSON.stringify(content),
      },
    },
  });

  console.log(response.data);
};

main().catch((error) => {
  console.error(error);
  core.setFailed(error.message);
  process.exit(-1);
});
