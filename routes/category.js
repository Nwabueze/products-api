
const express = require('express');
const bodyParser = require('body-parser');
const cookie = require('cookie');
const Category = require('../models/category');
const router = express.Router();
router.use(express.static('client'));
router.use(express.json());


router.get('/', async (req, res) => {
    const data = await Category.find({});
    
    res.json(data ? data : []);
});

router.post('/', async (req, res) => {
    const arr = req.body;
    
    await arr.map(async(item) => {
        const newCateg = await new Category({name: item, image: '', description: '',});
        await newCateg.save();
    })
    
    
    const data = await Category.find({});
    
    res.json(data ? data : []);
});

module.exports = router;

