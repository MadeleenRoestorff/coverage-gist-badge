# coverage-gist-badge

Writes to your gist to update your coverage badge.

Your gist can be used as an endpoint for [shields io](https://shields.io/endpoint).

```
https://gist.githubusercontent.com/<user>/<gist-ID>/raw/test.json
```

```
https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/MadeleenRoestorff/e3835b95ac826635d78b5d047b92b16a/raw/coveragebadge1.json
```

## Usage Steps

Create a new [gist](gist.github.com) for your repo.

- Gist description
- Filename including extionsion
- Create public gist

Make a note of the gist ID in the URL

Go to [settings](https://github.com/settings/apps) and generate a [token](https://github.com/settings/tokens) with access scope selected as gist.

Add a new repository [secret](https://github.com/MadeleenRoestorff/coverage-gist-badge/settings/secrets/actions/)

Save the generated token as a new secret with GIST_SECTRET as the name.

## Acknowledgements

- [Dynamic Badges Action](https://github.com/Schneegans/dynamic-badges-action)
- [Gist-Write v1](https://github.com/sergeysova/gist-read-action)
- [readme so](https://readme.so/)
