import {getStockById, registerUser, addToWatchList, buyStock} from '../controllers/apiController';

// function accepta an express app as input, 
// and defines HTTP CRUD handler for this express app
const apis = (app) => {
    app.route('/stock/:stockID')
    .get(getStockById)

    app.route('/user/register')
    .post(registerUser)

    app.route('/watchlist/add')
    .post(addToWatchList)

    app.route('/buy')
    .post(buyStock)

}

export default apis;