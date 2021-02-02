var aws = require('aws-sdk');
aws.config.update({ region: 'us-east-2' });

exports.handler = async function (event) {
  const promise = new Promise(function (resolve, reject) {
    let info = `name: ${req.body.name}, age: ${req.body.age}`

    // all this in lambda -_-
    // jedynie co udało mi ogarnac za ten czas
    let params = {
      MessageBody: info,
      QueueUrl: queueUrl,
      DelaySeconds: 0
    };

    sqs.sendMessage(params, (err, data) => {
      if (err) {
        reject(new Error)
        console.log(err)
      } else {
        resolve("ok")
      }
    });



  })
  return promise;
}