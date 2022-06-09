const mongoose = require('mongoose');

const chaptersSchema = new mongoose.Schema({
    NumberOfChapter: String,
    NameOfChapter: String,
    Content: String,
    idComic: String,

}, {collection: 'Chapter'});
const chapters = mongoose.model('Chapter', chaptersSchema);
module.exports = chapters;

