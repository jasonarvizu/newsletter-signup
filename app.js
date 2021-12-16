//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
var https = require('https');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res) {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us5.api.mailchimp.com/3.0/1884bff94b"

    const options = {
        method: "POST",
        auth: "jason1:e1e4ada356974e27e821d330e209acae-us5"
    }

    const request = https.request(url, options, function(response) {
        
        if (response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html");    
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

})

app.get("/failure", function(res, req) {
    res.redircet("/");
});

app.listen(3000, function() {
    console.log("Server is running on Port 3000");
});



// API Key
// e1e4ada356974e27e821d330e209acae-us5

// List ID
// 1884bff94b