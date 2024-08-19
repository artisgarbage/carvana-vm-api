# Carvana Boulder VM Development API

**IMPORTANT:** This repo uses the OpenAPI configuration from the [API Project](https://codelab303.postman.co/workspace/Carvana-Workspace~c3992710-1000-4b60-8bc5-dc6166b07970/api/0a3530d1-92f2-4a18-8c8a-87676f442c76?action=share&creator=15186956) that is part of the Carvana Workspace in Postman
<img width="1010" alt="Screenshot 2024-08-08 at 6 28 06 PM" src="https://github.com/user-attachments/assets/b22a389c-f3d2-45c6-88e8-b2ebbd52a8c8">
[LIVING API DOCUMENTATION](https://codelab303.postman.co/workspace/Carvana-Workspace~c3992710-1000-4b60-8bc5-dc6166b07970/api/0a3530d1-92f2-4a18-8c8a-87676f442c76/definition/eff333d2-fd4d-40af-839b-9fe2ba5351ba/file/5a242f78-525c-48a5-a552-e4007752566c)

## Getting Started

- Run the appropriate version of NodeJS `nvm use`
- Review [`package.json`](https://github.com/codelab303/carvana-vm-api/blob/chavez-wip/package.json)
- Run `yarn install`
- To do work, run `yarn dev`

**Runs on http://localhost:9000**

**Testing out the API**

````bash
curl --location 'http://localhost:9000/stock/' \
--header 'X-Api-Key: SuperSecretApiKey123'```
````

## Running in different environments

Pass in a specific ENV to the yarn command of your choice, likely `yarn start`

```bash
dotenvx run --env-file=.env.prod -- yarn start
```
