const express = require('express');
const router = express.Router();
const fs = require('fs');
const aws = require('aws-sdk');
aws.config.loadFromPath('./config.json');
const queueUrl = "https://sqs.us-east-2.amazonaws.com/372767132430/YearNameSQS"
const path = require("path");
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

  let params = {
    MessageBody: info,
    QueueUrl: queueUrl,
    DelaySeconds: 0
  };

  sqs.sendMessage(params, (err, data) => {
    if (err) {
      res.send({ info: err });
      console.log(err)
    } else {
      console.log(data)   // nie otrzymuje receiptID
      var params = {
        TableName: 'nameAge',
        Item: {
          'info': { S: info },
        }
      };


      ddb.putItem(params, function (err, data) {
        if (err) {
          console.log("Error", err);
          res.send({info: 'error'});
        } else {
          console.log("Success", data);
          res.send({info: 'ok'});

          // sqs.deleteMessage(params, function (err, data) {
          //   if (err) {
          //     res.send(err);
          //   }
          //   else {
          //     res.send(data);
          //   }
          // });
        }
      });

    };


    //res.send({info: data})
    //console.log(data)

  });

})

module.exports = router;