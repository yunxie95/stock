import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    email: {
        type: String,
        required : 'Please enter an email address'
    },
    password: {
        type : String, 
        required : 'Please enter a valid password'
    },
    watchList: {
        type : [String], 
        default : [],
    },
    portfolio: { // MongoDB map accept key as String, value can be costumized
        type : Map, 
        of: Number,
        default : {}
    },
    fund: {
        type : Number,
        default : 0
    }
});