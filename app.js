const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://netninja:Avy2KvwRT0y6UafE@atlascluster.v70yhzm.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    //listen for requests
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');
//app.set('views', 'myviews');

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

//create custom middleware
// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('mehod: ', req.method);
//     next();
// });

//mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });

//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

app.get('/single-blog', (req, res) => {
    Blog.findById('656696e4bbeb322f94652f0d')
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
});

//routes
app.get('/', (req, res) => {
    //res.send('<p>home page</p>');
    //res.sendFile('./views/index.html', {root: __dirname});
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat Bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'}
    // ];
    // res.render('index', {title: 'Home', blogs});
    res.redirect('/blogs');
});

//custom middleware
// app.use((req, res, next) => {
//     console.log('in the next middleware');
//     next();
// });

app.get('/about', (req, res) => {
    //res.send('<p>about page</p>');
    //res.sendFile('./views/about.html', {root: __dirname});
    res.render('about', {title: 'About'});
});



//redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// });

//blog routes
app.use('/blogs', blogRoutes);

//404 page
app.use((req, res) => {
    //res.status(404).sendFile('./views/404.html', {root: __dirname});
    res.status(404).render('404', {title: '404'});
});