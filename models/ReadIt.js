var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');

var readIt = new mongoose.Schema({
	file: String
});

module.exports = mongoose.model('ReadIt', readIt);
