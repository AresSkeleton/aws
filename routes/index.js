const express = require('express');
const router = express.Router();
const fs = require('fs');
const aws = require('aws-sdk');
aws.config.loadFromPath('./config.json');
const queueUrl = "https://sqs.us-east-2.amazonaws.com/372767132430/YearNameSQS"
const path = require("path");
const { Lambda } = require('aws-sdk');
const sqs = new aws.SQS();
const ddb = new aws.DynamoDB();



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});



router.post('/sendSQS', function (req, res, next) {
  console.log(req.body.name);
  console.log(req.body.age)

  let info = `name: ${req.body.name}, age: ${req.body.age}`

  // all this in lambda -_-
  // jedynie co udało mi ogarnac za ten czas
  lambda = new aws.Lambda();

  let params = {
    FunctionName: 'test',
    InvocationType: 'RequestResponse',
    LogType: 'None'
  };


  //res.send({info: data})
  //console.log(data)
  lambda.invoke(params, function (err, data) {
    if (err) {
      prompt(err);
    } else {
      res.send({info: "ok"});
    }
  });


});

module.exports = router;