//code you need to grab the data from keys.js
var keys = require('./keys.js');
var request = require("request");
var Spotify = require('node-spotify-api');
var fs = require('fs');
// Store all of the arguments in an array
var nodeArgs = process.argv;


 
//spotify
var spotify = new Spotify({
  id: "9599e0d8ed024a898b95b742c689a2bd",
  secret: "f119444bdb934e33b5e8385adddf131b"
});

var spotifyStuff = "";

for (var i = 2; i < nodeArgs.length; i++) {

  if (i > 2 && i < nodeArgs.length) {

    spotifyStuff = spotifyStuff + "+" + nodeArgs[i];

  }

  else {

    spotifyStuff += nodeArgs[i];

  }
}

var queryUrl = 'https://api.spotify.com/v1/search?q=' + spotifyStuff + '&limit=20&type=track';

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
var body = JSON.parse(body);  
    for (var i = 0; i < body.tracks.items.length; i++) {
     
      console.log('artist(s) = ' + body.tracks.items[i].artists[0].name);
      console.log('song title = ' + body.tracks.items[i].name);
      console.log('preview = ' + body.tracks.items[i].preview_url);
      console.log('album = ' + body.tracks.items[i].album.name);
                    
    };
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
});





//The Movie Section-------------------------
// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 2; i < nodeArgs.length; i++) {

  if (i > 2 && i < nodeArgs.length) {

    movieName = movieName + "+" + nodeArgs[i];

  }

  else {

    movieName += nodeArgs[i];

  }
}

if(!movieName) {
       movieName = "Mr.Nobody";
    };

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";


// This line is just to help us debug against the actual URL.
//console.log(queryUrl);

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      

            var movie_data = {
                "Title"                 : JSON.parse(body).Title,
                "Released"              : JSON.parse(body).Released,
                "Country"               : JSON.parse(body).Country,
                "Language(s)"           : JSON.parse(body).Language,
                "Actors"                : JSON.parse(body).Actors,
                "IMDB Rating"           : JSON.parse(body).imdbRating,
                "Rotten Tomatoes Rating": JSON.parse(body).tomatoRating,
                "Rotten Tomatoes URL"   : JSON.parse(body).tomatoURL,
                "Plot"                  : JSON.parse(body).Plot
            }
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language(s): " + JSON.parse(body).Language);
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("IMBD Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
        console.log("Plot: " + JSON.parse(body).Plot);
          
  }
    
});