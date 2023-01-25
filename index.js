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

  if (namedLogo != '') {
    content.namedLogo = namedLogo;
  }

  if (color != '') {
    content.color = color;
  }

  const request = JSON.stringify({
    files: { [filename]: { content: JSON.stringify(content) } },
  });

  const octokit = new Octokit({
    auth: core.getInput('auth'),
  });

  console.log(core.getInput('auth'));

  //   const response = await octokit.gists.update({
  //     gist_id: core.getInput('gistID'),
  //     description: 'An updated gist description',
  //     request,
  //   });

  //   await octokit.request('PATCH /gists/{gist_id}', {
  //     gist_id: core.getInput('gistID'),
  //     description: 'An updated gist description',
  //     request,
  //   });

  const response = await octokit.request('GET /gists/{gist_id}', {
    gist_id: core.getInput('gistID'),
  });

  const { files } = response.data;

  console.log(response.data);
  console.log('help');

  //   core.setOutput('content', files[filename].content);
};

main().catch((error) => {
  console.error(error);
  core.setFailed(error.message);
  process.exit(-1);
});
