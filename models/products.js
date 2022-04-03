const mongoose = require("mongoose");

const host = process.env.LOCAL_MONGODB_URI || 'mongodb://localhost/nextapp1';
mongoose.connect(host, { useNewUrlParser: true, useUnifiedTopology: true });
const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    category_id: {type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true},
    category_name: {type: String, required: true},
    image: {type: String, default: ''},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true, default: 0},
    description: {type: String, default: ''},
    date_added: {type: Date, default: new Date()}
},
{
    timestamps: true
});

const Products = mongoose.models.Product || mongoose.model('Product', productSchema);
module.exports =  Products;