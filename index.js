const core = require('@actions/core');
const axios = require('axios');

const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `token ${core.getInput('auth')}`,
  },
};

console.log(config);

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

axios.post(
  `https://api.github.com/gists/${core.getInput('gistID')}/`,
  request,
  config
);

console.log(request);
