
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
// var mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/app')


app.use(express.static('./'))
app.get('/dash', function(request, response){
	response.sendFile('./dash.html', {root: './'})
})
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var HawkUser = require('./db').HawkUser
var HawkMeal = require('./db').HawkMeal

var user = {}

app.get('/', function(req, res){
    res.sendFile('./index.html', {root: './'})
})


app.post('/hawk-user', function(req, res, next){
    console.log(req.body)
    //our mongoose schema should handle converting the age string to a number
    var newUser = new HawkUser(req.body)
    newUser.save(function(err){
        if (err){ next(err) }
        else {
            user=newUser
            res.send({success:'Successfully saved new user!'})
        }
    })

})
app.post('/signin-user', function(req, res, next){
    console.log(req.body)
    //our mongoose schema should handle converting the age string to a number
    HawkUser.findOne({username: req.body.username}, function(err, data){
        if (err){ next(err) }
        else if (data) {
            user=data
            console.log('this user signed in: ', data)
            // res.status(200).send(data)
            res.send({success: '200'})
        } else {
            res.send({failure:'Failed to login'})
        }
    })

})
app.post('/create-meal', function(req, res, next){
    console.log(req.body)
    //our mongoose schema should handle converting the age string to a number
    var newMeal = new HawkMeal(req.body)
    newMeal.save(function(err){
        if (err){ next(err) }
        else {
            res.send({success:'Successfully entered a meal!'})
        }
    })

})
app.get('/all-meals', function(req, res, next){
    console.log(req.body)
    HawkMeal.find(function (err, hawkmeal) {
    if (err) {
      return handleError(err);
    }
    console.log('this is hawkmeal: ', hawkmeal)
    res.send(hawkmeal)
    })

})

app.get('/me', function(req, res){
    res.send(user)
})
app.get('/me/meals', function(req, res, next){
    HawkMeal.find({_hawkuser: user._id}, function(err, data){
        if (err) { next(err) 
        } else {
            res.send(data)
            console.log(data)
        }
    })
})
app.get('/read-data', function(req, res, next){
    console.log(data)
    HawkMeal.find({}, function(err, data){
        if (err) { next(err) }
        else {
            res.send(data)
        }
        // console.log(data)
    })
})
app.use(function(err, req, res, next){
    console.log('something went wrong: ', err)
    res.send(err)
})

app.listen(8080)