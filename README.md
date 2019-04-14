# koopal.io
Source code for my [personal website](https://koopal.io).

[![Netlify Status](https://api.netlify.com/api/v1/badges/020bdfbd-260a-46ac-a46e-94e738eff632/deploy-status)](https://app.netlify.com/sites/angry-lalande-772045/deploys)

## Install
```bash
yarn --ignore-engines
```

## Develop
```bash
yarn dev
yarn lint
yarn storybook
```

## Test
```bash
yarn test
```

## Build
```bash
yarn build
```

## Build resume pdf locally
```bash
python3 -m venv .venv
source .venv/bin/activate
yarn build:generate-resume-pdf
```

## Other commands
Analyze bundles
```bash
yarn build analyze
```

Dependency management
```bash
yarn dependencies
yarn dependences:upgrade
# On error, run first:
# rm -rf node_modules && yarn --ignore-engines
```




