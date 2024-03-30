import { collection as _collection } from '../conn';

export async function saveSMSCode(req, res) {
    console.log('--------request-----------');
    console.log(req);
    let collection = await _collection("sms");
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
