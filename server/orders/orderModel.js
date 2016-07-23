var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
 serviceType: {
 	type: String
 },
 quantity: {
 	type: String
 },
 totalPrice: {
 	type: String
 },
 delivered: {
 	type:Boolean,
 	default: false
 },
 fullName:String,
 address:String,
 phoneNumber:Number,
 orderDate:{
 	type:Date,
 	default:Date.now
 },
 userLocation: Object
});



module.exports = mongoose.model('orders', OrderSchema);
