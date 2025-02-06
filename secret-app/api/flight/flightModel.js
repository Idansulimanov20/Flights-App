const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FlightSchema = new Schema({
source: {
    type: String,
    required: [true, 'A flight must have source'],
    trim: true
},
destination: {
    type: String,
    required: [true, 'A flight must have destination'],
    trim: true
},
price: {
    type: Number,
    required: [true, 'A flight must have price'],
    trim: true
},
passengers: {
    type: Number,
    trim: true
},
time: {
    type: Date,
    required: [true, 'A flight must have time'],
    trim: true
}
});
module.exports = mongoose.model('flights',FlightSchema);