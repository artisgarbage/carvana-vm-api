import "source-map-support/register";
import OpenAPIBackend from "openapi-backend";
import Express from "express";
import morgan from "morgan";

import type { Request } from "openapi-backend";

const app = Express();
app.use(Express.json());

// define api
const api = new OpenAPIBackend({
  definition: "./VM-API-Spec.json",
  handlers: {
    getVehicles: async (c, req: Express.Request, res: Express.Response) =>
      res.status(200).json([
        { id: "vmAuto1", name: "Subaru Car", type: "Unique Label" },
        { id: "vmAuto2", name: "BMW Car", type: "Unique Label" },
        { id: "vmAuto3", name: "BMW Car", type: "Unique Label" },
      ]),
    getStockedVehicleById: async (
      c,
      req: Express.Request,
      res: Express.Response
    ) => res.status(200).json({ operationId: c.operation.operationId }),
    addStockedVehicleById: async (
      c,
      req: Express.Request,
      res: Express.Response
    ) => res.status(200).json({ operationId: c.operation.operationId }),
    getQueue: async (c, req: Express.Request, res: Express.Response) =>
      res.status(200).json({ operationId: c.operation.operationId }),
    queueVehicleById: async (c, req: Express.Request, res: Express.Response) =>
      res.status(200).json({ operationId: c.operation.operationId }),
    queueClear: async (c, req: Express.Request, res: Express.Response) =>
      res.status(200).json({ operationId: c.operation.operationId }),
    coinDrop: async (c, req: Express.Request, res: Express.Response) =>
      res.status(200).json({ operationId: c.operation.operationId }),
    paletteReturn: async (c, req: Express.Request, res: Express.Response) =>
      res.status(200).json({ operationId: c.operation.operationId }),
    validationFail: async (c, req: Express.Request, res: Express.Response) =>
      res.status(400).json({ err: c.validation.errors }),
    notFound: async (c, req: Express.Request, res: Express.Response) =>
      res.status(404).json({ err: "not found" }),
  },
});

api.registerSecurityHandler("ApiKey", (c) => {
  const authorized = c.request.headers["X-Api-key"] === "SuperSecretApiKey123";
  // truthy return values are interpreted as auth success
  // you can also add any auth information to the return value
  return authorized;
});

api.init();

// logging
app.use(morgan("combined"));

// use as express middleware
app.use((req, res) => api.handleRequest(req as Request, req, res));

// start server
app.listen(9000, () => console.info("api listening at http://localhost:9000"));
