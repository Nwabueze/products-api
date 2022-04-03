const mongoose = require("mongoose");

const host = process.env.LOCAL_MONGODB_URI || 'mongodb://localhost/nextapp1';
mongoose.connect('mongodb://localhost/nextapp1', { useNewUrlParser: true, useUnifiedTopology: true });
const productSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true },
    image: {type: String, default: ''},
    description: {type: String, default: ''},
},
{
    timestamps: true
});

const Category = mongoose.models.Category || mongoose.model('Category', productSchema);
module.exports = Category;