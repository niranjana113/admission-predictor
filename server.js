const http = require("http");
const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "public");
const mime = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript"
};

http.createServer((req, res) => {
  const file = req.url === "/" ? "/index.html" : req.url.split("?")[0];
  const fp = path.join(publicDir, file);

  fs.readFile(fp, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": mime[path.extname(fp)] || "application/octet-stream"
    });
    res.end(data);
  });
}).listen(process.env.PORT || 3000);