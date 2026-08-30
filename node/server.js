const http = require("node:http");
const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, {"content-type": "application/json"});
    return res.end(JSON.stringify({status: "ok"}));
  }
  res.writeHead(404);
  res.end();
});
server.listen(8080, "0.0.0.0", () => console.log("listening on :8080"));
