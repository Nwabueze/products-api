/*
const express = require('express');
const app = new express();


app.use('/api/user', require('./routes/user.js'));
app.use('/api/products', require('./routes/products.js')); 
app.use('/api/category', require('./routes/category.js'));

app.use((req,res) => {
    res.status(404)
        .send('This page cannot be found');
});
*/
const app = require('./app');
let server = app.listen(8000, () => {
    console.log('Listening', server.address().port);
});



