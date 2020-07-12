yarn tsc && rm -r dist
yarn eslint --fix "src/**" && yarn prettier --write "src/**"