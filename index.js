const express = require('express');
morgan = require('morgan');
const app = express();

app.use(morgan('common'));

//variable
let topMovies = [
  {
  title: 'Black Panther',
  },
  {
  title: 'Avengers:EndGame',
  } ,
  {
  title: 'Legally Blond',
  },
  {
  title: 'Spider Man: No Way Home',
  },
  {
    title: 'Harry Potter',
  },
  {
    title: 'Little Woman',
  },
  {
    title: 'Turning Red',
  },
  {
    title: 'The Dark Knight',
  },
  {
    title: 'Forrest Gump',
  },
  {
    title: 'Joker',
  },
]

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