const express = require("express");
const bodyParser = require("body-parser");
const mj = require("mathjax-node");
const app = express();

const port = process.env.PORT || 3000;

mj.config({
    MathJax: {
        // Set MathJax configuration options here
    }
});
mj.start();

app.use(bodyParser.json());

app.post("/", (req, res) => {
    const input = req.body.input;
    if (!input) {
        return res.status(400).json({ error: "Missing input parameter" });
    }

    mj.typeset({
        math: input,
        format: "MathML",
        svg: true
    }, function (data) {
        res.type("svg");
        res.send(data.svg);
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});