const { MongoClient } = require('mongodb');

module.exports = {
    async saveSMSCode(req, res) {
        if (Object.keys(req.query) === 0) {
            return res.status(500);
        }
        let message = req?.query?.text;
        const toNumber = req?.query?.to;
        console.log('message', message)
        if (!message || !toNumber) {
            return res.status(500);
        }
        let messagesArray = []
        message = message.replace(/^\D+/g, '').split(' ')
        message.forEach((msg) => {
            let letters = []
            let nans = 0
            for (i = 0; i < msg.length; i++) {
                 if (!parseInt(msg[i]) && parseInt(msg[i])!==0) {
                    nans++
                 }
            }
            if (nans <= 1) {
                for (i = 0; i < msg.length; i++) {
                    if (parseInt(msg[i]) || parseInt(msg[i])===0) {
                        letters.push(msg[i])
                    }
                }
            }
            messagesArray.push(letters.join(''))
        })

        
        const uri = "mongodb+srv://michaeltwilliams92:RedLag00n1!2@@cluster0.gktdpbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        console.log('--------requestBody-----------');
        console.log(req.body);
        MongoClient.connect(uri, async (error, database) => {
            if (error) {
                return res.status(500);
            }
            const db = database.db('sms')
            db.collection('sms').updateOne({ phoneNumber: toNumber }, { $set: { phoneNumber: toNumber, message: messagesArray[0] || req.query.text }}, { upsert: true }, function (err, sms) {
                if (err) {
                    return res.status(500);
                }
                return res.status(201);
            });
        })
    },
    async getSMSCode(req, res) {
        if (!req.query) {
            return res.status(500);
        }
        const uri = "mongodb+srv://michaeltwilliams92:RedLag00n1!2@@cluster0.gktdpbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        console.log('--------requestQuery-----------');
        console.log(req.query);
        MongoClient.connect(uri, async (error, database) => {
            if (error) {
                return res.status(500);
            }
            const db = database.db('sms')
            db.collection('sms').findOne({ phoneNumber: req.query.number }, function (err, sms) {
                if (err) {
                    return res.status(500).send({ error: err });
                }
                return res.status(201).send({ message: sms.message });
            });
        })
    }
}
