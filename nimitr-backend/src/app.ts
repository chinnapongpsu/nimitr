import express, { Application, NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import cors from "cors";
import path from "path";
import config from "config";
import { v1 as uuid } from "uuid";
import { createServer, Server } from "http";
import { ApolloServer } from "@apollo/server";
import "./Dbconfig/mongoDB";
import schema from "./graphql";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import routerv1 from "./router/v1/router";

(async function () {
  const app: Application = express();
  const port = config.get<number>("app.port");
  const host = config.get<string>("app.host");
  const barcodeDir = path.resolve(__dirname, "../barcode");

  app.use(cors());
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(express.json({ limit: "50mb" }));
  app.use("/marker", express.static(path.join(__dirname, "../marker")));
  app.use("/barcode", express.static(path.join(__dirname, "../barcode")));
  app.use("/media", express.static(path.join(__dirname, "../media")));
  app.use("/pattern", express.static(path.join(__dirname, "../pattern")));
  app.use("/assets", express.static(path.join(__dirname, "../assets")));

  app.use("/", routerv1);

  app.post("/project", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const directoryProject = req.body.id;
      const markerPath = path.join(__dirname, "../marker");
      const mediaPath = path.join(__dirname, "../media");
      const patternPath = path.join(__dirname, "../pattern");

      if (directoryProject) {
        await Promise.all([
          fs.mkdir(path.join(mediaPath, directoryProject), { recursive: true }),
          fs.mkdir(path.join(markerPath, directoryProject), { recursive: true }),
          fs.mkdir(path.join(patternPath, directoryProject), { recursive: true }),
        ]);
        res.send({ message: "Directories created successfully!" });
      } else {
        res.send({ message: "Directory creation failed!" });
      }
    } catch (err) {
      next(err);
    }
  });

  app.post("/uploadmedia", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { media, type, id } = req.body;
      const uuidPath = `${uuid()}.${type}`;
      if (!id) {
        return res.status(400).send({ message: "Project ID is required" });
      }

      const mediaPath = path.join(__dirname, "../media", id, uuidPath);

      if (media) {
        const base64Data = media.replace(/^data:([A-Za-z-+/]+);base64,/, "");
        await fs.writeFile(mediaPath, base64Data, { encoding: "base64" });
        res.send({ url: `http://localhost:8000/media/${id}/${uuidPath}` });
      } else {
        console.log("🚀 ~ app.post ~ uuidPath:", uuidPath);
        res.send({ message: "Upload media failed" });
      }
    } catch (err) {
      next(err);
    }
  });

  app.put("/uploadmedia", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { media, type, id, filename } = req.body;

      // Input validation
      if (!id || !filename) {
        return res.status(400).send({ message: "Project ID and filename are required" });
      }
      if (!media || !type) {
        return res.status(400).send({ message: "Media and type are required" });
      }
      if (!/^data:([A-Za-z-+/]+);base64,/.test(media)) {
        return res.status(400).send({ message: "Invalid media format" });
      }

      const mediaPath = path.join(__dirname, "../media", id, filename);

      // Check if file exists before deleting
      try {
        await fs.access(mediaPath);
        // Delete the existing file
        await fs.unlink(mediaPath);
      } catch {
        // If file does not exist, return a 404 response
        return res.status(404).send({ message: "File not found" });
      }

      // Prepare new file path
      const newFilename = `${uuid()}.${type}`;
      const newMediaPath = path.join(__dirname, "../media", id, newFilename);

      // Write new media file
      const base64Data = media.replace(/^data:([A-Za-z-+/]+);base64,/, "");
      await fs.writeFile(newMediaPath, base64Data, { encoding: "base64" });

      // Send response with the new file URL
      res.send({ url: `http://localhost:8000/media/${id}/${newFilename}` });
    } catch (err) {
      next(err);
    }
  });

  app.delete("/deletemedia", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, filename } = req.body;

      // Input validation
      if (!id || !filename) {
        return res.status(400).send({ message: "Project ID and filename are required" });
      }

      // Construct the file path
      const mediaPath = path.join(__dirname, "../media", id as string, filename as string);

      // Check if the file exists before deleting
      try {
        await fs.access(mediaPath);
        // Delete the file
        await fs.unlink(mediaPath);
        res.status(200).send({ message: "File deleted successfully" });
      } catch (err) {
        // If file does not exist, return a 404 response
        return res.status(404).send({ message: "File not found" });
      }
    } catch (err) {
      next(err);
    }
  });

  app.get("/barcode", (req: Request, res: Response, next: NextFunction) => {
    try {
      const filePath = path.resolve(__dirname, "../barcode", req.query.id as string);
      res.sendFile(filePath);
    } catch (err) {
      next(err);
    }
  });

  app.get("/barcodes", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const files = await fs.readdir(barcodeDir);
      res.json({ files });
    } catch (err) {
      next(err);
    }
  });

  const httpServer: Server = createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  const serverCleanup = useServer(
    {
      schema,
      context: async (ctx: any, msg, args) => {
        console.log("Context:", ctx?.connectionParams.authentication, msg, args);
        return "userrrr";
      },
      onConnect: async (ctx) => {
        console.log("WebSocket connected:", ctx.connectionParams);
      },
      onDisconnect(ctx, code, reason) {
        console.log("WebSocket disconnected!");
      },
    },
    wsServer
  );

  interface MyContext {
    token?: string;
  }

  const server = new ApolloServer<MyContext>({
    schema,
    csrfPrevention: false,
    cache: "bounded",
    plugins: [
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({ origin: ["http://localhost:3000", "https://nimitr.art", "https://uat.nimitr.art"] }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        token: req.headers.authorization,
      }),
    })
  );

  httpServer.listen(port, () => {
    console.log(`Server is now running on http://${host}:${port}/graphql`);
  });
})();
