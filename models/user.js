
require('dotenv').config();
const mongoose = require("mongoose");

const LOCAL = process.env.LOCAL_MONGODB_URI || 'mongodb://localhost/nextapp1';
const LIVE = process.env.MONGO_CONN_STR;


const config = (hostname) => {
    const host = hostname === "localhost" ? LOCAL : LIVE;
    mongoose.connect('mongodb://localhost/nextapp1', { useNewUrlParser: true, useUnifiedTopology: true });
    const Schema = mongoose.Schema;
    const requiredString = { type: String, required: true };
    const uniqueString = { type: String, required: true, unique: true };
    const defaultTime = { type: Number, default: Date.now };
    const falseDefault = { type: Boolean, default: false };

    const userSchema = new Schema({
        name: requiredString,
        email: { ...requiredString, unique: true },
        password: requiredString,
    }, { timestamps: true });

    return mongoose.models.user || mongoose.model("user", userSchema);
};

/*
mongoose.connect(LOCAL, { useNewUrlParser: true, useUnifiedTopology: true });  
const Schema = mongoose.Schema;
const requiredString = {type: String, required: true};
const userSchema = new Schema({
    name: requiredString,
    email: { ...requiredString, unique: true},
    phone: requiredString,
    password: requiredString,
    interests: requiredString,
    otp: { type: String, default: ''},
    valid_phone: { type: Boolean, default: false},
    valid_email: { type: Boolean, default: false},
    otp_time: { type: Number, default: Date.now},
    email_time: {type: Number, default: Date.now},
    profile_photo: {type: String, default: 'prfp.PNG'},
    cover_photo: {type: String, default: 'fb-cover-1.PNG'},
},  {timestamps: true});

const User = mongoose.models.userfour || mongoose.model("userfour", userSchema);
module.exports = User;
*/

module.exports = config;
