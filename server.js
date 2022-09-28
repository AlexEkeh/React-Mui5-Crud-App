const jsonServer = require("json-server");
const cors = require("cors");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, "data", "db.json"));
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;

server.use(cors());
server.use(router);
server.use(jsonServer.bodyParser);

// Serve static assets if in Production
if (process.env.NOED_ENV === "production") {
  server.use(
    jsonServer.defaults({
      static: path.resolve(__dirname, "Client", "build"),
    })
  );

  server.get("*", (_req, res) => {
    res.sendFile(path.resolve(__dirname, "Client", "build", "index.html"));
  });
}

server.listen(port, () => {
  console.info(`Server running on port ${port}`);
});
