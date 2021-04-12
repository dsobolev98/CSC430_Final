var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.json('test schedule');
});

app.get('/courses', function(req, res){
    const cookie = req.query.cookie;

    db = req.app.get('locals.client').db('CSC430');

    db.collection('student').findOne({cookie:cookie}, (err, person) => {
        db.collection('enrolled').find({studentID:person.ID}).toArray((err, courses) => {
            let arr = [];
            let courseInfo = [];
            courses.forEach(function(course){
                arr.push(course.courseID)
            });
            db.collection('course').find({ID: {$in: arr}}).toArray((err, courses)=>{
                res.json(courses)
            })
        });
    });
});

app.get('/info', function(req, res){
    const id = req.query.id;

    db = req.app.get('locals.client').db('CSC430');

    db.collection('course').findOne({id:id}, (err, course)=>{
        res.json(course)
    })
})

module.exports = app;