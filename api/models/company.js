
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CompanySchema = new Schema({
  companyId: {
    type: String,
    required: 'Please enter companyId'
  },
  companyName: {
    type: String,
    required: 'Please enter company Name'
  },
  isActive: {
  	type: Boolean,
  	default: 0
  },
  addDate: {
  	type: Date,
  	required: 'Please enter registrtion date'
  },
  updateDate: {
  	type: Date,
  	required: 'Please enter update Date'
  },
});

module.exports = mongoose.model('Company', CompanySchema);