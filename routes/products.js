
const express = require('express');
const bodyParser = require('body-parser');
const cookie = require('cookie');
const Products = require('../models/products');
const router = express.Router();
router.use(express.static('client'));
router.use(express.json());


router.get('/', async (req, res) => {
    const data = await Products.find({});

    res.json(data ? data : []);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const data = await Products.findOne({_id: id});

    res.json(data ? data : {});
});

router.post('/new/add', async (req, res) => {
    const doc = req.body;

    const newProduct = await new Products(doc);
    const data = await newProduct.save(doc);

    res.json(data ? { status: true, } : { status: false, });
});

router.put('/:id', async (req, res) => {

    const ck = cookie.parse(req.headers.cookie || "");
    const doc = req.body;
    const id = req.params.id;
    // Make sure the fields are complete
    if(Object.keys(doc).length == 4){
        res.json({status: false});
        return;
    }
    
    const data = await Products.updateOne({_id: id}, { $set: doc});
    res.json(data ? { status: true } : { status: false });
    
});

router.delete('/deleteMany', async (req, res) => {
    const ids = req.body;
    const ck = cookie.parse(req.headers.cookie || "");
    console.log(ids);
    let deletedAll = true;
    let counter = 0;
    
    await ids.map(async(id) => {
        const data = await Products.deleteOne({_id: id});
        if(!data.deletedCount){
            deletedAll = false
            counter+= data.deletedCount;
        }
    });
    
    res.json({ status: deletedAll, count: counter, });
    
});

router.delete('/deleteOne/:id', async (req, res) => {
    const id = req.params.id;
    const ck = cookie.parse(req.headers.cookie || "");
    
    const data = await Products.deleteOne({_id: id});
    res.json({status: data.deletedCount > 0})
    
});


module.exports = router;