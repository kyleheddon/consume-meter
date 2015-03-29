var mongoose = require('mongoose');
var Item = require('./item.js');

var ItemUsage = mongoose.model('ItemUsage', {
    date: Date,
    amount: Number,
    item_id: String
});

module.exports = ItemUsage;
