//code you need to grab the data from keys.js
var keys = require('./keys.js');
var request = require("request");
var Spotify = require('node-spotify-api');
var fs = require('fs');
// Store all of the arguments in an array
var nodeArgs = process.argv;


 
//spotify----------------------------------------------

function spotifyStuff(song) {
    var spotify = new Spotify (keys.spotifyKeys);
    console.log("Song: " + song);

    spotify.search({ type: 'track', query: song }, function(err, data) {

        for (var i = 0; i < data.tracks.items.length; i++) {

          console.log('artist(s) = ' + data.tracks.items[i].artists[0].name);
          console.log('song title = ' + data.tracks.items[i].name);
          console.log('preview = ' + data.tracks.items[i].preview_url);
          console.log('album = ' + data.tracks.items[i].album.name);
                    
        };
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        restart();
 
    });

};


//twitter -----------------------------------------
function myTweets(name){
	var client = new Twitter(keys.twitterKeys);
	 
	var params = {screen_name: name};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  
	  	console.log("Twitter Search: " + name);

	  	for (var i = 0; i < tweets.length && i < 20; i++){
	  		var text = tweets[i].text;
	  		var created = tweets[i].created_at;
	    	console.log(created);
	    	console.log(text);
	    	
		}
		
	  }
	  else {console.log(error)};
	});
}



////The Movie Section-------------------------
//// Create an empty variable for holding the movie name
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


request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {
      

        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language(s): " + JSON.parse(body).Language);
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("IMBD Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Plot: " + JSON.parse(body).Plot);
          
  }
    
});

// fs -----------------------------------------------
function doWhatItSays(){
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
	    return console.log(error);
	  }
	  console.log(data);
	  var dataArr = data.split(",");
	  var song = dataArr[1];
	  spotifyThisSong(song);
	});
}

//inquirer -----------------------------------------
function restart(){
	inquirer
	  	.prompt([
		    {
			    type: "confirm",
			    message: "Would you like to start over?",
			    name: "confirm",
			    default: true
		    }
		])
		.then(function(response) {
		    if (response.confirm) { inquire()}
		    else { console.log("See you next time!")}
	  	});
}

function inquire(){
	inquirer
	  	.prompt([
		    {
		      	type: "list",
		      	message: "What would you like to do?",
		      	choices: ["My Tweets", "Spotify This Song", "Movie This", "Do What It Says"],
		      	name: "option1"
		    },
		 ])
		 .then(function(response) {

		  	if(response.option1 === "My Tweets"){
		  	  inquirer
		  		.prompt([
		  			{
				        type: "input",
				    	message: "Enter Twitter User Name: ",
				   	    name: "userName"
		  			},
		  		])
		  		.then(function(response) {
		  			var info = response.userName.trim()
		  			if(info !=""){
			  			myTweets(info);
			  		} else { myTweets("AndrewDicer")}
		  		})
		  	}

		  	else if(response.option1 === "Spotify This Song"){
		  	  inquirer
		  		.prompt([
		  			{
				        type: "input",
				    	message: "Enter A Song Title: ",
				   	    name: "song"
		  			},
		  		])
		  		.then(function(response) {
		  			var info = response.song.trim()
		  			if(info !=""){
			  			spotifyThisSong(info);
			  		} else { 
			  			var song = "track:'The Sign' artist:'Ace of Base'";
			  			spotifyThisSong(song)
			  		}
		  		})
		  	}

		  	else if(response.option1 === "Movie This"){
		  	  inquirer
		  		.prompt([
		  			{
				        type: "input",
				    	message: "Enter A Movie Title: ",
				   	    name: "movie"
		  			},
		  		])
		  		.then(function(response) {
		  			var info = response.movie.trim()
		  			if(info !=""){
			  			movieThis(info);
			  		} else { movieThis("Tron")}
		  		})
		  	}
		  	else if(response.option1 === "Do What It Says"){ doWhatItSays()}	
		 });
}

inquire();