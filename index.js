import express from 'express';
import data from './data/mock.json' assert { type: "json" };

const app = express();

const PORT = 3000;

//display images on the root of the project
app.use(express.static('public'));

app.use('/images', express.static('images'));

//using express.json and express.urlencoded
//app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//GET request
app.get('/', (req, res) => {
    res.json(data);
});

//POST - express.json and express.urlencoded
app.post('/item', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

// GET - redirect method
app.get('/redirect', (req, res) => {
    res.redirect('https://www.facebook.com');
});


//GET with routing parameter
app.get('/class/:id', (req, res) => {
    const studentID = Number(req.params.id);

    const student = data.filter((student)=> student.id === studentID)
    res.send(student);
});

// GET with next()
app.get('/next', (req, res, next) => {
    console.log('The response will be sent by the next function ...');
    next();
}, (req, res) => {
    res.send('Hello from next function');
});



app
    .route('/class')
    .get((req, res) => {
        // res.send('this is a get request at /class');
        throw new Error();
    })
    .post((req, res) => {
        res.send('this is a post request at /create');
    })
    .put((req, res) => {
        res.send('this is a put request at /edit');
    });

// app.get('/class', (req, res) => {
//     res.send('this is a get request at /class');
// });

//POST request
// app.post('/create', (req, res) => {
//     res.send('this is a post request at /create');
// });

//PUT request
// app.put('/edit', (req, res) => {
//     res.send('this is a put request at /edit');
// });

//DELETE request
app.delete('/delete', (req, res) => {
    res.send('this is a delete request at /delete');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT} !`);
});

