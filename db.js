var mongoose = require('mongoose')
// var mongoDB = 'mongodb://localhost:127.0.0.1/stock-app'
// 
// var promise = mongoose.connect('mongodb://localhost/myapp', {
//   useMongoClient: true,
//   /* other options */
// });
var promise = mongoose.connect('mongodb://localhost:27017/local', {


useMongoClient: true,
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// // make this available to our users in our Node applications (https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications)

// // USER DB SCHEMA
var userSchema = new mongoose.Schema({
    // name: String, // we think we don't need this 8/21
    username: { type: String, required: true, unique: true }, // Q for Eddie - why lowercase?
    password: { type: String, required: true },
    HawkMeal: [{ type: mongoose.Schema.Types.ObjectId}] 

  // we'll need some error handling for duplicate usernames and emails
})

// var Schema = mongoose.Schema;
var HawkUser = mongoose.model('hawkuser', userSchema); // 'hawkuser' is sigular version of the collect in the DB, so it refers to objects (singular) in the DB.



// // MEAL DB SCHEMA
var mealSchema = new mongoose.Schema({
    // name: String, // we think we don't need this 8/21
    _hawkuser : { type: mongoose.Schema.Types.ObjectId }, 
    stockname: { type: String, required: true },
    sharenumber: { type: String, required: true },
    price: { type: Number, required: true },
    mealdate: { type: Date, required: true },
  // we'll need some error handling for duplicate usernames and emails
})

// // var Schema = mongoose.Schema;
var HawkMeal = mongoose.model('hawkmeal', mealSchema); // 'hawkmeal' is sigular version of the collect in the DB, so it refers to objects (singular) in the DB.


HawkMeal.find(function (err, hawkmeal) {
  if (err) {
      return handleError(err);
  }
    console.log('This is the "stock pick" from the db.js: ', hawkmeal)
    
})













module.exports = {HawkUser: HawkUser, HawkMeal: HawkMeal}
