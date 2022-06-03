const express = require('express');
morgan = require('morgan');
bodyparser = require('body-parser'),
uuid = require('uuid');

let auth = require('./auth')(app);:

const passport = require('passport');
require('./passport');

const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyparser.json());
app.use(morgan('common'));


const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
mongoose.connect('mongodb://localhost:27017/myFlix', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
  res.send('Welcome to my myFlix website');
});

// (Read) and responds a json with all movies in database
app.get('/movies', (req, res) => {
  Movies.find()
  .then((movies) => {
  res.status(201).json(movies);
  })
  .catch((err) => {
  console.error(err);
  res.status(500).send('Error: ' + err);
  });
  });

//(Read) responds with a json of the specific movie asked for title 
app.get('/movies/:title', (req, res) => {
  Movies.findOne({Title: req.params.title})
  .then((movie) => {
    res.json(movie);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});


//(Read) responds with a json of the specific movie asked for genre 
app.get('/movies/genres/:genre', (req, res) => {
  Movies.findOne({ 'Genre.Name': req.params.GenreName })
    .then((movie) => {
      res.json(movie.Genre.Description);
    })
    .catch((err) => {
     console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//(Read) responds with a json of the specific movie asked for director 
app.get('/movies/director/:DirectorName', (req, res) => {
  Movies.findOne({ 'Director.Name': req.params.DirectorName })
    .then((movie) => {
      res.json(movie.Director);
    })
    .catch((err) => {
      handleError(err, res);
    });
});

// (Read) and responds a json with all users in database

// Get all users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get a user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Create user
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

//update
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//(create) add movie to favorites list
app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//Delete a movie from user`s favorites list
app.delete('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
  $pull: { FavoriteMovies: req.params.MovieID }
  },
  { new: true,}, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//Delete user
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// app.get('/documentation', (req, res) => {
//   res.sendFile('public/documentation.html', { root: __dirname });
// });


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