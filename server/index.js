const express = require('express');
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const cors = require('cors');
app.use(cors());

const mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if(err) {throw err;}

    app.set('locals.client', client);
    client.db('CSC430').dropDatabase();
    const db = client.db('CSC430');

    coursecollection = db.collection('course');
    schoolcollection = db.collection('school');
    studentcollection = db.collection('student');
    instructorcollection = db.collection('instructor');
    enrolledcollection = db.collection('enrolled');

    coursecollection.insertOne({ ID: '1012', Name : 'GEO', Number : '123', Instructor : 'John Doe', Time : '12:30', Description : 'Geology', Total_Enrollement : '30', schoolID:'111'});
    coursecollection.insertOne({ ID: '1013', Name : 'GEO', Number : '149', Instructor : 'Phil Dwyer', Time : '2:30', Description : 'Geology (Pre-req: GEO 123)', Total_Enrollement : '24', schoolID:'111'});
    coursecollection.insertOne({ ID: '1014', Name : 'MTH', Number : '124', Instructor : 'Pat Santo', Time : '10:10', Description : 'Math', Total_Enrollement : '5', schoolID:'111'});
    coursecollection.insertOne({ ID: '1015', Name : 'MTH', Number : '246', Instructor : 'Joe Bocci', Time : '12:30', Description : 'Math (Pre-req: MTH 124)', Total_Enrollement : '16', schoolID:'111'});
    coursecollection.insertOne({ ID: '1016', Name : 'MTH', Number : '492', Instructor : 'Pat Santo', Time : '4:30', Description : 'Math (Pre-req: MTH 246)', Total_Enrollement : '21', schoolID:'111'});
    coursecollection.insertOne({ ID: '1017', Name : 'MTH', Number : '984', Instructor : 'Steve Smtih', Time : '10:10', Description : 'Math (Pre-req: MTH 492)', Total_Enrollement : '9', schoolID:'111'});
    coursecollection.insertOne({ ID: '1018', Name : 'CSC', Number : '126', Instructor : 'Debra Sky', Time : '6:30', Description : 'Computer Science', Total_Enrollement : '25', schoolID:'111'});
    coursecollection.insertOne({ ID: '1019', Name : 'CSC', Number : '345', Instructor : 'Abe Patel', Time : '2:30', Description : 'Computer Science (Pre-req: CSC 126)', Total_Enrollement : '29', schoolID:'111'});
    coursecollection.insertOne({ ID: '1031', Name : 'CSC', Number : '345', Instructor : 'Abe Patel', Time : '5:30', Description : 'Computer Science (Pre-req: CSC 126)', Total_Enrollement : '29', schoolID:'111'});
    coursecollection.insertOne({ ID: '1020', Name : 'CSC', Number : '430', Instructor : 'Sam Spring', Time : '4:40', Description : 'Computer Science (Pre-req: CSC 126 , MTH 246)', Total_Enrollement : '3', schoolID:'111'});
    coursecollection.insertOne({ ID: '1021', Name : 'CSC', Number : '435', Instructor : 'Abe Patel', Time : '8:10', Description : 'Computer Science (Pre-req: CSC 345)', Total_Enrollement : '17', schoolID:'111'});
    coursecollection.insertOne({ ID: '1022', Name : 'PHY', Number : '101', Instructor : 'Albert Schein', Time : '12:30', Description : 'Physics', Total_Enrollement : '13', schoolID:'111'});
    coursecollection.insertOne({ ID: '1023', Name : 'PHY', Number : '140', Instructor : 'Paul Gumbo', Time : '12:30', Description : 'Physics (Pre-req: PHY 101)', Total_Enrollement : '3', schoolID:'111'});
    coursecollection.insertOne({ ID: '1024', Name : 'PHY', Number : '390', Instructor : 'Victoria Guava', Time : '6:30', Description : 'Physics (Pre-req: PHY 140)', Total_Enrollement : '30', schoolID:'111'});
    coursecollection.insertOne({ ID: '1025', Name : 'ENG', Number : '100', Instructor : 'Chris Thyme', Time : '12:30', Description : 'English', Total_Enrollement : '19', schoolID:'111'});
    coursecollection.insertOne({ ID: '1026', Name : 'ENG', Number : '111', Instructor : 'Chris Thyme', Time : '4:30', Description : 'English (Pre-req: ENG 100)', Total_Enrollement : '12', schoolID:'111'});
    coursecollection.insertOne({ ID: '1027', Name : 'ENG', Number : '151', Instructor : 'Becky Black', Time : '12:30', Description : 'English (Pre-req: ENG 111)', Total_Enrollement : '13', schoolID:'111'});
    coursecollection.insertOne({ ID: '1028', Name : 'PHO', Number : '117', Instructor : 'Larry Stein', Time : '6:30', Description : 'Photography', Total_Enrollement : '8', schoolID:'111'});
    coursecollection.insertOne({ ID: '1029', Name : 'HST', Number : '105', Instructor : 'Bor Ring', Time : '8:10', Description : 'History', Total_Enrollement : '23', schoolID:'111'});
    coursecollection.insertOne({ ID: '1030', Name : 'HST', Number : '309', Instructor : 'Jack Tipperson', Time : '4:30', Description : 'History (Pre-req: HST 105)', Total_Enrollement : '13', schoolID:'111'});

    schoolcollection.insertOne({ID: '111', name: 'CSI', address:'123 Main st', telephone:'9176785566'});
    studentcollection.insertOne({ID:'9811', name:'Mary May', address:'45 side st', telephone:'7185556644', isLoggedIn: 'false', cookie: '1000111', username:'mary811@gmail.com', password:'password', schoolID:['111']});
    instructorcollection.insertOne({ID:'3456', name:'John Doe', address:'98 some st', telephone:'9875556767'});

    enrolledcollection.insertOne({courseID:'1014', studentID:'9811', status:'Enrolled'});
    enrolledcollection.insertOne({courseID:'1019', studentID:'9811', status:'Enrolled'});
    enrolledcollection.insertOne({courseID:'1023', studentID:'9811', status:'Enrolled'});


    app.get('/testing', function(req, res) {
        res.json("testing");
    });
});

var homeRouter = require('./routes/home');
var authRouter = require('./routes/auth');
var scheduleRouter = require('./routes/schedule');
var searchRouter = require('./routes/search');
var cartRouter = require('./routes/cart');
app.use('/', homeRouter);
app.use('/auth', authRouter);
app.use('/schedule', scheduleRouter);
app.use('/search', searchRouter)
app.use('/cart', cartRouter)


app.listen('4500');
module.exports = app;