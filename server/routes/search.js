var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.json("Test search");
});

app.get('/inSchool', function(req, res) {
    const cookie = req.query.cookie
    db = req.app.get('locals.client').db('CSC430');

    db.collection('student').findOne({cookie:cookie}, (err, student)=>{
        res.json(student.schoolID)
    });
});

app.get('/findCoursesInSchool', function(req, res) {
    const school = req.query.schools
    db = req.app.get('locals.client').db('CSC430');

    db.collection('course').distinct('Name', {schoolID:school}, (err, courses)=>{
        res.json(courses)
    });
});

app.get('/findNumInSub', function(req, res) {
    const subject = req.query.subject
    const school = req.query.school
    db = req.app.get('locals.client').db('CSC430');

    db.collection('course').distinct('Number', {Name:subject, schoolID:school}, (err, courses)=>{
        res.json(courses)
    });
});

app.get('/find', function(req, res) {
    const school = req.query.school;
    const name = req.query.name;
    const number = req.query.num;
    db = req.app.get('locals.client').db('CSC430');

    db.collection('course').find({Name:name, Number:number, schoolID:school}).toArray((err, courses)=>{
        res.json(courses)
    });
});


module.exports = app;