"use strict";
const express = require("express");
const webPush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");


//./node_modules/.bin/web-push generate-vapid-keys
const publicVapidKey =
  "BENkEd8FVuv9UKNlxVCwEo53On94gZYkOhp4O5fwvGhYcQ2LM1aAzNkf5Cy3xXe2NSCUNt2QxTbCff4tAPLKNb0";
const privateVapidKey = "itdj90lFR3OxvMYRkYmWJeMfKQQ3WyrgWpxSNiixTWU";

webPush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

const subscribe=async(req,res)=>{
  //get subscription object
  const subscription ={
    "endpoint":"http://localhost:33000",
    "keys":{
      "auth":privateVapidKey,
      "p256dh":publicVapidKey
    }
  }
  
  "http://localhost:33000"

  //send created
  
  //create payload
  const payload = JSON.stringify({ title: "push test" });
  
  //pass object into sendNotification
  webPush
  .sendNotification(subscription, payload)
  .catch((err) => console.log(err));
  res.status(201).json({});
};

module.exports=subscribe
