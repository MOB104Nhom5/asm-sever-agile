const mongoose = require('mongoose');

const comicsSchema = new mongoose.Schema({
    Name: String,
    Logo:String,
    Author: String,
    Category:[String],
    Description: String,
    TrangThai:Boolean,
    Like:[String],
    DateUp:String,
    IDUserUp:String,

},{collection:'Comic'});
const comics = mongoose.model('Comic', comicsSchema);
module.exports = comics;

