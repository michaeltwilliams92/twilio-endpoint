const { MongoClient } = require('mongodb');

export async function saveSMSCode(req, res) {
    const uri = "mongodb+srv://michaeltwilliams92:RedLag00n1!2@3#@cluster0.gktdpbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(uri);
    let conn;
    try {
    conn = await client.connect();
    } catch(e) {
    console.error(e);
    }
    let db = conn.db("sms");
    console.log('--------request-----------');
    console.log(req);
    let collection = await db("sms");
    collection.updateOne({ phoneNumber: req.body.number }, { phoneNumber: req.body.number, message: req.body.message }, { upsert: true }, function (err, sms) {
        if (err) {
            return res.status(500);
        }
        return res.status(201);
    });

}
export async function getSMSCode(req, res) {
    let collection = await _collection("sms");
    collection.findOne({ phoneNumber: req.body.number }, function (err, sms) {
        if (err) {
            return res.status(500).send({ error: err });
        }
        return res.status(201).send({ message: sms.message });
    });
}
