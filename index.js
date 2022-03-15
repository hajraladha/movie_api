const express = require('express');
morgan = require('morgan');
const app = express();

app.use(morgan('common'));

// GET requests
app.get('/', (req, res) => {
          res.send('Welcome to myFlix App!');
        });
        
        app.get('/documentation', (req, res) => {                  
          res.sendFile('public/documentation.html', { root: __dirname });
        });
        
        app.get('/movies', (req, res) => {
          res.json(topMovies);
        });

        // listen for requests
app.listen(8080, () => {
          console.log('Your app is listening on port 8080.');
        });

        //Serving Static Files
app.use(express.static('public')); //static file given access via express static

//Error Handling
app.use((err, req, res, next) => {
          console.error(err.stack);
          res.status(500).send('Something broke!');
        });