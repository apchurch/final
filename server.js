
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


app.listen(8080)