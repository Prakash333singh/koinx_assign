## Koinx backend assignment

Deployed url:

### How to use locally?

- Clone the repository

  ```
  git clone
  ```

- Install the packages using the package manager of your choice (eg: npm, pnpm, yarn)

  ```
  <package_manager> install
  ```

- The env file is already included in the repository along with the env variables `API_URL` and `DATABASE_URL`. The MongoDB instance has been deployed on Atlas. Incase you wish to use mongodb locally you many comment out the first `DATABASE_URL` and uncomment the second one (which is the local URL).

- To run the application use the command
  ```
  npm run dev
  ```
  or replace npm with the package manager you are using. The server will start at `localhost:3000` by default if no PORT is specified in the env file.

### Folder Structure:

```
└── 📁src
    └── app.ts
    └── config.ts
    └── 📁controllers
        └── tradeController.ts
    └── 📁database
        └── dbConnect.ts
    └── 📁lib
        └── tradeCronService.ts
    └── 📁middleware
        └── errorHandler.ts
    └── 📁models
        └── tradeModel.ts
    └── 📁routes
        └── tradeRoute.ts
```

### Tasks:
