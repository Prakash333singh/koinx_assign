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

- The env file is already included in the repository along with the env variables `DATABASE_URL`. The MongoDB instance has been deployed on Atlas. Incase you wish to use mongodb locally you many comment out the first `DATABASE_URL` and uncomment the second one (which is the local URL).

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

- **Live URL:** `https://koinx-assign-1.onrender.com/api/v1/trades/upload`
- **Method:** `POST`
- **Description:** This endpoint allows you to upload a CSV file for processing.

**Steps to Test:**

1.  Use a tool like [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to send a POST request.
2.  In Postman, select `POST` as the method and set the URL to `http://13.201.56.56/api/upload`.
3.  In the `Body` tab, select `form-data`, then choose `File` as the type and upload a CSV file of your choice.
4.  Send the request and check the response to ensure that the file is processed correctly and the data is uploaded to the database.
    screenshot-[https://asset.cloudinary.com/dvp9end1y/7b04e5fb948386750a3279bc04dbf51f]

- **Live URL:** `https://koinx-assign-1.onrender.com/api/v1/trades/balance`
- **Method:** `POST`
- **Description:** This endpoint retrieves the balance based on the timestamp provided in the request body.

**Steps to Test:**

1.  Use a tool like Postman or cURL to send a POST request.
2.  In Postman, select `POST` as the method and set the URL to `http://localhost:3000/api/v1/trades/balance`.
3.  In the `Body` tab, select `raw` and choose `JSON` as the format. Enter the following JSON payload:

    ```json
    {
      "timestamp": "2022-09-29T00:00:00Z"
    }
    ```

4.  Replace the `timestamp` with a valid ISO 8601 date-time string according to your data.
5.  Send the request and verify that the response contains the correct balance information based on the provided timestamp.

- Sample Request

```bash
curl curl --location 'https://koinx-assign-1.onrender.com/api/v1/trades/balance' \
--header 'Content-Type: application/json' \
--data '
{
  "timestamp": "2022-09-29T00:00:00Z"
}'
```

screenshot-[https://asset.cloudinary.com/dvp9end1y/7b04e5fb948386750a3279bc04dbf51f]
