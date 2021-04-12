var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.json('test auth');
});

app.post('/login', function(req, res) {
    const username = req.param('username').toLowerCase();
    const password = req.param('password').toLowerCase();
    let query={username:username, password:password};

    req.app.get('locals.client').db('CSC430').collection('student').findOne(query, (err, item) => {
        if(item){
            req.app.get('locals.client').db('CSC430').collection('student').updateOne(query, {$set:{isLoggedIn: 'true'}}, (err, updated) => {
                if(updated){
                    res.json(item);
                }
                else{
                    res.json(null);
                }
            });
        } else{
            res.json(null);
        }
    });
});

module.exports = app;