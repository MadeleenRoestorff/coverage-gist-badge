#!/usr/bin/env bash

if npx eslint --max-warnings 0 .
then
    echo "ESlint exit code: $?"
    echo "ES Lint Successful"
else
    echo "eslint exit code: $?"
    echo "Failed ESlint" >&2
    exit 1
fi

if npx prettier --check .
then
    echo "Prettier Completed"
else
    echo "Prettier Error" >&2
    exit 1
fi

