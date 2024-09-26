const { MongoClient } = require('mongodb');

module.exports = {
    async saveSMSCode(req, res) {
        console.log('saveSMSCode');
        try {
            console.log('req', req);
            if (Object.keys(req.body).length === 0) {
                return res.status(200).send('No body');
            }
            
            let message = req?.body?.text;
            const toNumber = req?.body?.from;
            console.log('message', message);
            
            if (!message || !toNumber) {
                return res.status(200).send('Invalid data');
            }
            
            let messagesArray = [];
            message = message.replace(/^\D+/g, '').split(' ');
            message.forEach((msg) => {
                let letters = [];
                let nans = 0;
                for (let i = 0; i < msg.length; i++) {
                    if (!parseInt(msg[i]) && parseInt(msg[i]) !== 0) {
                        nans++;
                    }
                }
                if (nans <= 1) {
                    for (let i = 0; i < msg.length; i++) {
                        if (parseInt(msg[i]) || parseInt(msg[i]) === 0) {
                            letters.push(msg[i]);
                        }
                    }
                }
                messagesArray.push(letters.join(''));
            });

            const uri = "mongodb+srv://michaeltwilliams92:RedLag00n1%212%40@cluster0.gktdpbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
            console.log('--------requestBody-----------');
            console.log(req.body);
            
            MongoClient.connect(uri, async (error, database) => {
                if (error) {
                    console.log('line 41 error', error);
                    return res.status(200).send('Database connection error');
                }
                
                const db = database.db('sms');
                db.collection('sms').updateOne({ phoneNumber: toNumber }, { $set: { phoneNumber: toNumber, message: messagesArray[0] || req.body.text }}, { upsert: true }, function (err, sms) {
                    if (err) {
                        console.log('line 47 error', err);
                        database.close();
                        return res.status(200).send('Database update error');
                    }
                    console.log('everything is good');
                    database.close();
                    return res.status(200).send('Success');
                });
            });
        } catch(e) {
            console.log('line 55 error', e);
            return res.status(200).send('Server error');
        }
    },
    async getSMSCode(req, res) {
        if (!req.body) {
            return res.status(500).send('No body');
        }
        
        const uri = "mongodb+srv://michaeltwilliams92:RedLag00n1%212%40@cluster0.gktdpbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        console.log('--------requestbody-----------');
        console.log(req.body);
        
        MongoClient.connect(uri, async (error, database) => {
            if (error) {
                return res.status(500).send('Database connection error');
            }
            
            const db = database.db('sms');
            db.collection('sms').findOne({ phoneNumber: req.body.number }, function (err, sms) {
                if (err) {
                    return res.status(500).send({ error: err });
                }
                return res.status(201).send({ message: sms.message });
            });
        });
    }
};