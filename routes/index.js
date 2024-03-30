var SMS = require('../models/sms');

module.exports = {
    async saveSMSCode(req, res) {
        console.log('--------request-----------')
        console.log(req)
        let collection = await db.collection("sms");
        collection.updateOne( { phoneNumber : req.body.number }, { phoneNumber : req.body.number, message : req.body.message }, { upsert : true }, function(err, sms) {
            if (err) {
                return res.status(500)
              }
              return res.status(201)
        } );

    },

    async getSMSCode(req, res) {
        let collection = await db.collection("sms");
        collection.findOne({ phoneNumber : req.body.number }, function(err, sms) {
            if (err) {
                return res.status(500).send({error: err})
              }
              return res.status(201).send({message: sms.message})
        })
    },
}
