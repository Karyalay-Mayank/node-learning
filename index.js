const fs = require("fs");
const http = require("http");
const url = require("url");

/////////////////////////////////////////////////////////
// FILE

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");

// const textOut = `This is what we know about Avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log(textIn, textOut);

// Non-blocking, asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("Errors Papa");
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile(
//         "./txt/final.txt",
//         `${data1}\n${data2}\n${data3}`,
//         "utf-8",
//         (err) => {
//           console.log("Writted");
//         }
//       );
//     });
//   });
// });
// console.log("Will read file!!");

////////////////////////////////////////////////////////
// SERVER
const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the Overview");
  } else if (pathName === "/product") {
    res.end("This is the product");
  } else if (pathName === "/api") {
    fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
      const productData = JSON.parse(data);
      res.writeHead(200, {
        "Content-type": "application/json",
      });
      res.end(data);
      console.log(productData);
    });
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found</h2>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
