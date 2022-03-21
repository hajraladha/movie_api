const express = require('express');
morgan = require('morgan');
bodyparser = require('body-parser'),
uuid = require('uuid');

const app = express();

app.use(bodyparser.json());
app.use(morgan('common'));


let users =  [
  {
    id: '1',
    username: 'John',
    email: 'john@gmail.com',
    password: 'j0hn2022!',
    birthday: '14/02/1990',
    favorites: []
  }
]

//variable
let topMovies = [
  {
  title: 'Black Panther',
  year: '2018', 
  genre: {
    name: 'Action/Adventure',
    description:'',
  }, 
  director: {
    name: 'Ryan Coogler', 
    birth: '',
    death: '',
    bio: ''
  },
  actors: {},
  imgURL:'',
  },
  {
  title: 'Avengers:EndGame',
  year: '2019', 
  genre: {
    name: 'Action/Adventure',
    description:'',
  }, 
  director: {
    name: 'Anthony Russo and Joe Russo', 
    birth: '',
    death: '',
    bio: ''
  },
  actors: {},
  imgURL:'',
  } ,
  {
  title: 'Legally Blond',
  year: '2001', 
  genre: {
    name: 'Drama Comedy',
    description:'',
  }, 
  director: {
    name: 'Robert Luketic', 
    birth: '',
    death: '',
    bio: ''
  },
  actors: {},
  imgURL:'',
  },
  {
  title: 'Spider Man: No Way Home',
  year: '2021', 
  genre: {
    name: 'Action/Adventure',
    description:'',
  }, 
  director: {
    name: 'Jon Watts', 
    birth: '',
    death: '',
    bio: ''
  },
  actors: {},
  imgURL:'',
  },
  {
    title: 'Harry Potter and the Prisoner of Azkaban',
    year: '2004', 
    genre: {
      name: 'Fantasy/Adventure',
      description:'',
    }, 
    director: {
      name: 'Alfonso Cuarón', 
      birth: '',
      death: '',
      bio: ''
    },
    actors: {},
    imgURL:'',
  },
  {
    title: 'Little Women',
    year: '2019', 
    genre: {
      name: 'Romance/Drama',
      description:'',
    }, 
    director: {
      name: 'Greta Gerwig', 
      birth: '',
      death: '',
      bio: ''
    },
    actors: {},
    imgURL:'',
  },
  {
    title: 'Turning Red',
    year: '2022', 
    genre: {
      name: 'Comedy/Family',
      description:'',
    }, 
    director: {
      name: 'Domee Shi', 
      birth: '',
      death: '',
      bio: ''
    },
    actors: {},
    imgURL:'',
  },
  {
    title: 'The Dark Knight Rises',
    year: '2012', 
    genre: {
      name: ' Action/Thriller',
      description:'',
    }, 
    director: {
      name: 'Christopher Nolan', 
      birth: '',
      death: '',
      bio: ''
    },
    actors: {},
    imgURL:'',
  },
  {
    title: 'Forrest Gump',
    year: '1994', 
    genre: {
      name: 'Drama/Romance ',
      description:'',
    }, 
    director: {
      name: 'Robert Zemeckis', 
      birth: '',
      death: '',
      bio: ''
    },
    actors: {},
    imgURL:'',
  },
  {
    title: 'Joker',
    year: '2019', 
    genre: {
      name: 'Crime/Drama',
      description:'',
    }, 
    director: {
      name: 'Todd Phillips', 
      birth: '',
      death: '',
      bio: ''
    },
    actors: {},
    imgURL:'',
  },
]

app.get('/', (req, res) => {
  res.send('Welcome to my myFlix website');
});

// (Read) and responds a json with all movies in database
app.get('/movies', (req, res) => {
  res.status(200).json(movies);
});

//(Read) responds with a json of the specific movie asked for title 
app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = movies.find(movie => movie.title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('movie not found!')
  }
});

//(Read) responds with a json of the specific movie asked for genre 
app.get('/movies/genres/:genre', (req, res) => {
  const genre = movies.find((movie) => movie.genre.name === req.params.genre).genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('Genre not found!')
  }
});

//(Read) responds with a json of the specific movie asked for director 
app.get('/movies/directors/:name', (req, res) => {
  const director = movies.find((movie) => movie.director.name === req.params.name).director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(404).send('Director not found.')
  }
});


//Create user
app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.username) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    const message = 'Missing username in request body';
    res.status(400).send(message);
  };
});

//update
app.put('/users/:username', (req, res) => {
  const newUsername = req.body;

  let user = users.find((user) => { return user.username === req.params.username });

  if (user) {
    user.username = newUsername.username;
    res.status(200).json(user);
  } else {
    res.status(400).send('user not found!')
  }

});

//(create) add movie to favorites list
app.post('/users/:username/:movie', (req, res) => {

  let user = users.find((user) => { return user.username === req.params.username });

  if (user) {
    user.favorites.push(req.params.movie);
    res.status(200).send(req.params.movie + ' was added to ' + user.username + "'s favorites list.");
  } else {
    res.status(400).send('user not found!')
  };

});

//Delete a movie from user`s favorites list
app.delete('/users/:username/:movie', (req, res) => {

  let user = users.find((user) => { return user.username === req.params.username });

  if (user) {
    user.favorites = user.favorites.filter((mov) => { return mov !== req.params.movie });
    res.status(200).send(req.params.movie + ' was removed from ' + user.username + "'s favorites list.");
  } else {
    res.status(400).send('user not found!')
  };

});

//Delete user
app.delete('/users/:username', (req, res) => {

  let user = users.find(user => { return user.username === req.params.username });

  if (user) {
    users = users.filter((user) => { return user.username !== req.params.username });
    res.status(200).send(req.params.username + ' was deleted.');
  } else {
    res.status(400).send('user not found!')
  }

});

// app.get('/documentation', (req, res) => {
//   res.sendFile('public/documentation.html', { root: __dirname });
// });

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