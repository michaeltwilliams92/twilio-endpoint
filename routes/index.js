var SMS = require('../models/sms');

module.exports = {
    saveSMSCode(req, res) {
        SMS.updateOne( { phoneNumber : req.body.number }, { phoneNumber : req.body.number, message : req.body.message }, { upsert : true }, function(err, sms) {
            if (err) {
                return res.status(500)
              }
              return res.status(201)
        } );

    },

    getSMSCode(req, res) {
        SMS.findOne({ phoneNumber : req.body.number }, function(err, sms) {
            if (err) {
                return res.status(500).send({error: err})
              }
              return res.status(201).send({message: sms.message})
        })
    },
}
