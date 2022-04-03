const express = require('express');
const config = require('../models/user');
const { hashSync, compareSync } = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(express.static('client'));
router.use(express.json());

router.post('/', async (req, res) => {

    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let mailID = uuidv4();

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


module.exports = router;
