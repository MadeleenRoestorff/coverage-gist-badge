# coverage-gist-badge

[![Coverage Badges](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/MadeleenRoestorff/37d283de48f9508f6aed66f51beff8db/raw/029c777fee5280f2e4e9c1b06ebf8dd13aea592b/coverage_gist_badge_heads_main.json)](https://jestjs.io/docs/mock-function-api)
[![ESLinter Badges](https://img.shields.io/badge/Linter-ESlint-4B32C3?logo=ESLint)](https://eslint.org/docs/latest/rules/)
[![Prettier Badges](https://img.shields.io/badge/Formater-Prettier-F7B93E?logo=Prettier)](https://prettier.io/docs/en/precommit.html)
[![license](https://img.shields.io/badge/License-MIT-F0047F.svg)](LICENSE)
[![GitHub Workflow Status (with branch)](https://img.shields.io/github/actions/workflow/status/MadeleenRoestorff/coverage-gist-badge/test-badge.yml)](https://github.com/MadeleenRoestorff/coverage-gist-badge/actions)

The coverage-gist-badge repository simplifies updating your test coverage badge by writing directly to your Gist to patch your JSON file.

Your gist JSON file can be used as an endpoint for [shields io](https://shields.io/endpoint).

```
https://gist.githubusercontent.com/<user>/<gist-ID>/raw/test.json
```

```
https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/<user>/<gist-ID>/raw/test.json
https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/MadeleenRoestorff/e3835b95ac826635d78b5d047b92b16a/raw/coveragebadge1.json
```

Main componets:

- [Gist](gist.github.com)
- [Shields io](https://shields.io/endpoint)
- [Github Actions](https://docs.github.com/en/actions)
- [Github Tokens](https://github.com/settings/tokens)

## Usage Steps

### 1. Gist

Create a new [gist](gist.github.com) for your repository.

- Gist description
- Filename including extionsion
- Create public gist

Make a note of the gist ID in the URL.

### 2. Secret Token

Go to your main profile [settings](https://github.com/settings/apps) and generate a [**token**](https://github.com/settings/tokens) with access scope selected as gist.

Go to your repository settings and click on new repository secret (`github.com/user/repo/settings/secrets/actions/`).

Save the generated **token** as a new secret with GIST_SECTRET as the name.

The encrypted **token** will now be accessible in your repository actions/workflow files as `${{ secrets.GIST_SECRET }}`

### 3. Update your github workflow action file

```YML
name: Test Coverage Scripts on pull or push request
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "16.x"
      - run: npm ci
      - run: |
          SUMMARY="$(npm run test -- --coverage --coverageReporters='text-summary' | tail -2 | head -1)"
          TOKENS=($SUMMARY)
          echo "COVERAGE=$(echo ${TOKENS[2]})" >> $GITHUB_ENV
          REF=${{ github.ref }}
          echo "github.ref: $REF"
          IFS='/' read -ra PATHS <<< "$REF"
          BRANCH_NAME="${PATHS[1]}_${PATHS[2]}"
          echo $BRANCH_NAME
          echo "BRANCH=$BRANCH_NAME" >> $GITHUB_ENV
      - if: ${{ env.COVERAGE && github.ref == 'refs/heads/main' }}
        name: Create the Badge
        uses: MadeleenRoestorff/coverage-gist-badge@main
        with:
          auth: ${{ secrets.GIST_SECRET }}
          gistID: 123456789abc
          filename: coverage_gist_badge_${{ env.BRANCH }}.json
          label: Test Coverage
          message: ${{ env.COVERAGE }}
          namedLogo: jest
          color: pink
```

**WHERE**

| YML Statement                                         | Description                                                                                           |
| :---------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| `uses: MadeleenRoestorff/coverage-gist-badge@main`    | Reference to this repository. _DO NOT CHANGE_                                                         |
| `auth: ${{ secrets.GIST_SECRET }}`                    | Auth will point to the secret **token** created in step 2. _DO NOT CHANGE_                            |
| `gistID: 123456789abc`                                | Your gist ID created in step 1. **REQUIRED**                                                          |
| `filename: my_custom_filename_${{ env.BRANCH }}.json` | Filename with extionsion. **REQUIRED**                                                                |
| `label: Some Custom text`                             | Label with the text that appears on the left of the badge. **REQUIRED**                               |
| `message: ${{ env.COVERAGE }}`                        | Message is the coverage percentage that appears on the right of the badge. _DO NOT CHANGE_            |
| `namedLogo: jest`                                     | The namedLogo is optional. Please view [Simple Icons](https://simpleicons.org/) for more options.     |
| `color: green`                                        | The color is optional.                                                                                |
| `run: echo "CUSTOMVARIABLE=hello" >> $GITHUB_ENV`     | Create environment variables in previous steps, use as `${{ env.CUSTOMVARIABLE }}` in following steps |

### 4. Update your README file

Go to your now updated gist file click on the raw button and use the URL as an endpoint for your shieldIO
and add the badge to your README file

```
[Coverage Badges](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/user/123456789abc/raw/123456789abc/my_custom_filename_main.json)

```

### Notes

If no color is specified, the coverage-gist-badge repository will automatically choose the badge color based on the percentage coverage.

## Tech Stack

Node, JavaScript, Jest, ESLint, Prettier, Husky

## Acknowledgements

- [Dynamic Badges Action](https://github.com/Schneegans/dynamic-badges-action)
- [Gist-Write v1](https://github.com/sergeysova/gist-read-action)

If you want skip the husky validate (ESlint and prettier) hook use --no-verify

```bash
git commit -m "yolo!" --no-verify
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)

## Future Work

Scalability,
linear color gradient based on coverage percentage,
get request before patch to check if update is needed
