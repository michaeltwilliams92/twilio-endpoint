const { MongoClient } = require('mongodb');

module.exports = {
    async saveSMSCode(req, res) {
        if (Object.keys(req.body) === 0) {
            return res.status(500);
        }
        const uri = "mongodb+srv://michaeltwilliams92:RedLag00n1!2@@cluster0.gktdpbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        console.log('--------requestBody-----------');
        console.log(req.body);
        MongoClient.connect(uri, async (error, database) => {
            if (error) {
                return res.status(500);
            }
            const db = database.db('sms')
            db.collection('sms').updateOne({ phoneNumber: req.body.To }, { $set: { phoneNumber: req.body.To, message: req.body.Body }}, { upsert: true }, function (err, sms) {
                if (err) {
                    return res.status(500);
                }
                return res.status(201);
            });
        })
    },
    async getSMSCode(req, res) {
        const uri = "mongodb+srv://michaeltwilliams92:RedLag00n1!2@3#@cluster0.gktdpbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        const client = new MongoClient(uri);
        let conn;
        try {
            conn = await client.connect();
        } catch (e) {
            console.error(e);
        }
        let collection = await db("sms");
        collection.findOne({ phoneNumber: req.body.number }, function (err, sms) {
            if (err) {
                return res.status(500).send({ error: err });
            }
            return res.status(201).send({ message: sms.message });
        });
    }
}
