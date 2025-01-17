import "dotenv/config";
import "source-map-support/register";
import OpenAPIBackend from "openapi-backend";
import Express from "express";
import cors from "cors";
import morgan from "morgan";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import type { Request } from "openapi-backend";
import { drop } from "./coin";
import { queue } from "./queue_by_stock_number";

console.log(`ℹ️ API Running in MODE: ${process.env.MODE}`);

// Main Self-Invoking async function to enable await
(async () => {
  const app = Express();
  app.use(Express.json());
  // open the database
  const db = await open({
    filename: "./db/vm-co-948_North.db",
    driver: sqlite3.Database,
  });

  // define api
  const api = new OpenAPIBackend({
    definition: "./VM-API-Spec.json",
    handlers: {
      getVehicles: async (c, req: Express.Request, res: Express.Response) =>
        res
          .status(200)
          .json(
            JSON.parse(JSON.stringify(await db.all("SELECT * FROM stock")))
          ),
      getStockedVehicleById: async (
        c,
        req: Express.Request,
        res: Express.Response
      ) =>
        res
          .status(200)
          .json(
            await db.get(
              `SELECT * FROM stock WHERE id = ?`,
              `${req.path.split("/").pop()}`
            )
          ),
      addStockedVehicleById: async (
        c,
        req: Express.Request,
        res: Express.Response
      ) => res.status(200).json({ operationId: c.operation.operationId }),
      getQueue: async (c, req: Express.Request, res: Express.Response) =>
        res.status(200).json({ operationId: c.operation.operationId }),
      queueVehicleById: async (
        c,
        req: Express.Request,
        res: Express.Response
      ) => {
        let responseMsg = queue(false, "unsetStockNumber");
        res.status(200).json(responseMsg);
      },
      queueClear: async (c, req: Express.Request, res: Express.Response) =>
        res.status(200).json({ operationId: c.operation.operationId }),
      coinDrop: async (c, req: Express.Request, res: Express.Response) => {
        //attemptRealVend is FALSE by default
        let responseMsg = drop(false);
        console.log(`Responding with message: ${responseMsg.message}`);
        res.status(200).json(responseMsg);
        // res.status(200).json({ operationId: c.operation.operationId });
      },
      paletteReturn: async (c, req: Express.Request, res: Express.Response) =>
        res.status(200).json({ operationId: c.operation.operationId }),
      validationFail: async (c, req: Express.Request, res: Express.Response) =>
        res.status(400).json({ err: c.validation.errors }),
      notFound: async (c, req: Express.Request, res: Express.Response) =>
        res.status(404).json({ err: "not found" }),
    },
  });

  api.registerSecurityHandler("ApiKey", (c) => {
    const authorized =
      c.request.headers["X-Api-key"] === "SuperSecretApiKey123";
    // truthy return values are interpreted as auth success
    // you can also add any auth information to the return value
    return authorized;
  });

  api.init();

  // logging
  app.use(morgan("combined"));

  // enable CORS
  app.use(cors<Express.Request>());

  // use as express middleware
  app.use((req, res) => api.handleRequest(req as Request, req, res));

  // start server
  app.listen(process.env.PORT, () =>
    console.info(`api listening at http://localhost:${process.env.PORT}`)
  );
})();
