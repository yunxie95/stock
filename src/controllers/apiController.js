import google from 'google-finance-data';
import mongoose from 'mongoose';
import {UserSchema} from '../models/model';

// reference to 'Users' collection
const User = mongoose.model('User', UserSchema);

export const getStockById = (req, res) => {
    google.getSymbol(req.params.stockID)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.send(err);
    })
}

export const registerUser = (req, res) => {
    let newUser = new User(req.body);
    newUser.save((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
}

export const addToWatchList = (req, res) => {
    User.findOne({email : req.body.email}, (err, doc) => {
        if (err) {
            res.send(err);
        } 
        let stock = req.body.stockID;
        if (stock && doc.watchList.indexOf(stock) < 0) {
            doc.watchList.push(req.body.stockID);
        }
        doc.save();
        res.send(doc);
    })
}

export const buyStock = (req, res) => {
    User.findOne({email : req.body.email}, (err, doc) => {
        if (err) {
            res.send(err);
        }

        let stock = req.body.stockID;


        if (req.body.shares && stock && req.body.price) {
            let shares = Number(req.body.shares);
            let limitPrice = Number(req.body.price);
            
            let cost = shares * limitPrice;
            if (Number(doc.fund) < cost) {
                res.send('{success : false, reason : insufficient fund}');
                return;
            }

            doc.fund -= cost;
            let currShare = doc.portfolio.get(req.body.stockID);
            if (currShare) {
                doc.portfolio.set(stock, currShare + shares);
            } else {
                doc.portfolio.set(stock, shares);
            }

            doc.save();
            res.send(doc);


        }
    })
}