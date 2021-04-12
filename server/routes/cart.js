var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.json("Test cart");
});

app.get('/set', function(req, res) {
    const cookie = req.query.cookie;
    const courseid = req.query.ID;
    db = req.app.get('locals.client').db('CSC430');

    db.collection('student').findOne({cookie:cookie}, (err, student)=>{
        db.collection('enrolled').insertOne({courseID:courseid, studentID:student.ID}, (err, success)=>{
            res.json(success)
        });
    });
});

module.exports = app;