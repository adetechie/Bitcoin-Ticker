const express = require("express"),
bodyParser = require("body-parser"),
request = require("request"),

app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.post("/", (req, res) => {

    var amount = req.body.amount;
    var crypto = req.body.crypto;
    var fiat = req.body.fiat;

    var options = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        method: "GET",
        qs: {
            from: crypto,
            to: fiat,
            amount: amount
        }
    };

    request(options, (error, response, body) => {

        var data = JSON.parse(body);
        var price = data.price;

        var currentDate = data.time;

        res.write("<p>The current date is " + currentDate + "</P>");
        res.write("<h1>" + amount + crypto + " is currently worth "  + price + fiat + "</h1> ");

        res.send();
    });
});

app.listen(3000, () => console.log("Server is listening to port 3000"));