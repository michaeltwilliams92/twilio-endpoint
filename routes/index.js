const { MongoClient } = require('mongodb');

module.exports = {
    async saveSMSCode(req, res) {
        const uri = "mongodb+srv://michaeltwilliams92:RedLag00n1!2@@cluster0.gktdpbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        // const client = new MongoClient(uri);
        // let conn;
        // try {
        //     conn = await client.connect();
        // } catch (e) {
        //     console.error(e);
        // }
        // let db = conn.db("sms");
        console.log('--------request-----------');
        console.log(req);
        MongoClient.connect(uri, async (err, database) => {
            const db = database.db('sms')
            // console.log('--------------DB-------------------')
            // console.log(db)
            // const collection = await db('sms')
            db.collection('sms').updateOne({ phoneNumber: req.body.number }, { $set: { phoneNumber: req.body.number, message: req.body.message }}, { upsert: true }, function (err, sms) {
                if (err) {
                    return res.status(500);
                }
                return res.status(201);
            });
        })
        // console.log('--------request-----------');
        // console.log(req);
        // let collection = await db("sms");
        // collection.updateOne({ phoneNumber: req.body.number }, { phoneNumber: req.body.number, message: req.body.message }, { upsert: true }, function (err, sms) {
        //     if (err) {
        //         return res.status(500);
        //     }
        //     return res.status(201);
        // });

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
