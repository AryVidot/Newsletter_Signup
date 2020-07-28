const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

// set up the route
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
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
          LNAME: lastName,
        },
      },
    ],
  };

  //change the data (JS) into JSON for the resource
  const jsonData = JSON.stringify(data);

  const url = "https://us17.api.mailchimp.com/3.0/lists/664b32c8fa";

  //creating options - the most important option is teh METHOD (node.js docon https)
  const options = {
    method: "POST",
    auth: "ary1:130c94f8292584ed86271af99558f910-us17",
  };

  //make request: post data to our external resource (Mailchimp)
  //First passing a URL, then our options and finally the callback
  // which is going to give a response from the Mailchimp server

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  //To specify we are done with the request we add the below.
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server is runnning on port 3000.");
});

// Mailchimp
// API key
// f0ecdba0c335f5cf6c4f3719ad44ec79-us17
// new API key
// 130c94f8292584ed86271af99558f910-us17
//Audience/List Id to add at the end of the url
// 664b32c8fa

// --data '{"name":"Freddie'\''s Favorite Hats","contact":{"company":"Mailchimp","address1":"675 Ponce De Leon Ave NE","address2":"Suite 5000","city":"Atlanta","state":"GA","zip":"30308","country":"US","phone":""},"permission_reminder":"You'\''re receiving this email because you signed up for updates about Freddie'\''s newest hats.","campaign_defaults":{"from_name":"Freddie","from_email":"freddie@freddiehats.com","subject":"","language":"en"},"email_type_option":true}' \
