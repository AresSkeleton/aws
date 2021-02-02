var aws = require('aws-sdk');
aws.config.update({ region: 'us-east-2' });

exports.handler = async function (event) {
    //on sqs append
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
    
    
    
    return promise;
}