# coverage-gist-badge

![Coverage Badges](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/MadeleenRoestorff/37d283de48f9508f6aed66f51beff8db/raw/029c777fee5280f2e4e9c1b06ebf8dd13aea592b/coverage_gist_badge_heads_main.json)

Writes to your gist to update your coverage badge.

Your gist can be used as an endpoint for [shields io](https://shields.io/endpoint).

```
https://gist.githubusercontent.com/<user>/<gist-ID>/raw/test.json
```

```
https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/MadeleenRoestorff/e3835b95ac826635d78b5d047b92b16a/raw/coveragebadge1.json
```

## Usage Steps

### 1 Gist

Create a new [gist](gist.github.com) for your repo.

- Gist description
- Filename including extionsion
- Create public gist

Make a note of the gist ID in the URL

### 2 Secret Token

Go to your main profile [settings](https://github.com/settings/apps) and generate a [token](https://github.com/settings/tokens) with access scope selected as gist.

Add a new repository [secret](https://github.com/MadeleenRoestorff/coverage-gist-badge/settings/secrets/actions/) on your repo setting

Save the generated token as a new secret with GIST_SECTRET as the name.

### 3 Update your github workflow action file

Use your gist ID as gistID

```YML
name: Validate Script on pull request
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
          gistID: 37d283de48f9508f6aed66f51beff8db
          filename: coverage_gist_badge_${{ env.BRANCH }}.json
          label: Test Coverage
          message: ${{ env.COVERAGE }}
          namedLogo: jest
```

Go to your now updated gist file click on the raw button and use the URL as an endpoint for your shieldIO
and add the badge to your README file

## Acknowledgements

- [Dynamic Badges Action](https://github.com/Schneegans/dynamic-badges-action)
- [Gist-Write v1](https://github.com/sergeysova/gist-read-action)
- [readme so](https://readme.so/)

If you want skip the husky validate (ESlint and prettier) hook use --no-verify

```bash
git commit -m "yolo!" --no-verify
```
