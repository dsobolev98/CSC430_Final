var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.json("Test cart");
});

app.get('/set', function(req, res) {
    const cookie = req.query.cookie;
    const courseid = req.query.ID;
    const status = req.query.status;
    db = req.app.get('locals.client').db('CSC430');

    db.collection('student').findOne({cookie:cookie}, (err, student)=>{
        db.collection('enrolled').insertOne({courseID:courseid, studentID:student.ID, status:status}, (err, success)=>{
            res.json(success)
        });
    });
});

app.get('/explainWaitList', function(req, res){
    const ID = req.query.ID;
    db = req.app.get('locals.client').db('CSC430');

    db.collection('enrolled').find({courseID:ID}).toArray((err, array)=>{
        if(array){
            db.collection('course').findOne({ID:ID}, (err, result)=>{
                let enrollement = result.Total_Enrollement
                res.json(enrollement - array.length)
            })
        }
        else{
            res.json(null)
        }
    });
})

module.exports = app;