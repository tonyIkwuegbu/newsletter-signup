const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    var data = {
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
    const url = "https://us1.api.mailchimp.com/3.0/lists/3b5f772893"


    const options = {
        method: "POST",
        auth: "Tony234:3b1d77e7420c2bd9a1cad82366848792-us1"
    }


    const request = https.request(url, options, function (response) {
        if (response.statusCode ===200){
            res.sendFile(__dirname + "/success.html");

        }else {
            res.sendFile(__dirname + "/failure.html");
        }
        
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    });
    request.write(jsonData);
    request.end();
});

app.post("/failure", function (req, res) {
    res.redirect("/")
});



app.listen(process.env.PORT || 3000, function (req, res) {
    console.log("Server is listening on port 3000");
});










