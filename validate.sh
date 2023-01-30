#!/usr/bin/env bash

if npx eslint --max-warnings 0 .
then
    echo "ESLint Successful"
else
    echo "ESLint exit code: $?"
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

