const http = require("http");
const qp = require("querystring");
const jsonStore = require("diu-jsonstore");

const db = jsonStore.createDB("users.json");

function handle(req, res) {
    console.log(req.method, req.url);

    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, {
            "Content-Type": "text/plain"
        });

        res.end("Hello World");
        return;
    }
    if (req.url === "/register" && req.method === "POST") {
        let body = "";

        req.on("data", (piece) => {
            body += piece;
        });

        req.on("end", () => {
           
            const formData = qp.parse(body);

            console.log("Form Data:", formData);
            db.add(formData);
            console.log("Saved Data:", db.read(formData.id));

            res.writeHead(200, {
                "Content-Type": "text/plain"
            });

            res.end("Data saved successfully");
        });

        return;
    }

    res.writeHead(404, {
        "Content-Type": "text/plain"
    });

    res.end("Not Found");
}

const server = http.createServer(handle);

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});