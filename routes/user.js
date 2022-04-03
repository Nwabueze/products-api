const express = require('express');
const config = require('../models/user');
const { hashSync, compareSync } = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(express.static('client'));
router.use(express.json());

router.post('/register', async (req, res) => {

    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    // Let's be sure nobody sends an absolutely invalid request
    const valid = name.replace(/\W+/g, '').length > 2
        && email.match(/(\w+)@(\w+)\.(\w+)/)
        && password.replace(/\s+/g, '').length > 5;

    if (!valid) {
        res.json({ status: false });
    }

    /*
    encode the email and send it as part of the url, 
    then decode it once they get back through the link
    */
    const host = req.hostname;
    
    const data = { ...req.body };
    data.password = hashSync(data.password);
    const User = config(host);
    const newUser = await new User(data);
    const saved = await newUser.save();

    res.json(saved ? { status: true, name: data.name, email: data.email, } : { status: false, sent: false, });
   
});

router.get('/login/:mail/:password', async (req, res) => {
    const mail = req.params.mail;
    const password = req.params.password;
    
    const User = config(req.hostname);
    if (mail){
        const email = {email: mail};
        const filter = {name: 1, email: 1, password: 1, _id: 0};
        let doc = await User.findOne(email, filter);

        if(doc != null){
            if(compareSync(password, doc.password)){
                delete doc.password;
                res.json({status: true, ...doc});
            }else{
                res.json({status: false, reason: "incorrect email or password"});
            }
        }else{
            res.json({status: false, reason: "We couldn't find this record"});
        }
    }else{
        res.json({ status: false });
    }
});

router.get('/logout', (req, res) => {
    res.json({status: true});
});


module.exports = router;
