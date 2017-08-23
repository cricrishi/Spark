
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  email: {
    type: String,
    required: 'Please enter email Id'
  },
  deviceId: {
    type: String,
    required: 'deviceId is required'
  }
});

module.exports = mongoose.model('User', UserSchema);