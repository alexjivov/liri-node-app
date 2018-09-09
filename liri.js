require("dotenv").config();

var keys = require('./keys.js')


// NPM module for Twitter API
var Twitter = require("twitter");

// NPM module for Twitter API
var Spotify = require("node-spotify-api");

// NPM module for OMDB API
var request = require("request");

// NPM module used to read the random.txt file
var fs = require("fs");

// Output files for logs
var filename = "./logs.txt";

// NPM module used for logging solution
var log = require("simple-node-logger").createSimpleFileLogger(filename);

// All log information printed to log.txt
// log.SetLevel("all");

// Parameters and Controller
// ---------
// Declaring variables for omdb/spotify switch statement
var movieTitle;
var songTitle;
// Action request
var action = process.argv[2];

// Request specific information based on action
var argument = "";

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
// Controller function - which action is taken
//function doSomething(action, argument) {
    // Defines specific data relating to the action
    argument = getThirdArgument();
    switch (action) {
        //Get tweet list
        //case for switch statement
        case "my-tweets":
            getMyTweets();
            // ends case statement
            break;

        //get spotify info
        case "spotify-this-song":
            songTitle = argument;
            // Default to specific song if no argument
            // if (songTitle === "") {
            //     lookupSpecificSong();
            //     //Else look up song based ont title
            // } else {
                //song info from spotify
                getSongInfo(songTitle);
            //}
            break;

        //Gets movie information
        case "movie-this":

            //First gets movie title argument
            movieTitle = argument;

            // default movie if no movie title provided
            if (movieTitle === "") {
                getMovieInfo("Mr. Nobody");
            } else {
                getMovieInfo(movieTitle);
            }
            break;

        // Gets text inside file, and uses it to do something
        case "do-what-it-says":
            doWhatItSays();
            break;
    }

//}

// Return third argument - i.e. song title when requesting song information
function getThirdArgument() {
    console.log("3rdarg")
    //All arguments in an array
    argumentArray = process.argv;
    // Loops through words in node argument
    for (i = 3; i < argumentArray.length; i++) {
        argument += argumentArray[i];
    }
    return argument;
}
// Last 20 tweets function
function getMyTweets() {
    //Passes Twitter keys into call to Twitter API
    var client = new Twitter(twitterKeysFile.twitterKeys);

    //Search parameters for last 20 tweets
    var params = {q: "@JivovAlexander", count: 20};

    //Shows up to last 20 tweets in terminal
    client.get("search/tweets", params, function (error, tweets, response) {
        if (!error) {
            //Prints tweet text + creation date in loop
            for (i = 0; i < tweets.statuses.length; i++) {
                var tweetText = tweets.statuses[i].text;
                logOutput("Tweet Text: " + tweetText);
                var tweetCreationDate = tweets.statuses[i].text;
                logOutput("Tweet Creation Date: " + tweetCreationDate);
            }
        } else {
            logOutput(error);
        }
    });
}

// Calls Spotify Api to retrieve song info
function getSongInfo(songTitle) {
    console.log(songTitle)
    //Spotify AP gets track
    spotify.search({ type: "track", query: songTitle }).then(function(response) {
       var artistsArray = response.tracks.items[0].album.artists;

        //Array to hold artist names when more than one artist exists for a song
        var artistsNames = [];

        // Pushes artists for track to array.
        for (var i = 0; i < artistsArray.length; i++) {
            artistsNames.push(artistsArray[i].name);
        }
        //Makes artists array into a string to print cleaner
        var artists = artistsNames.join(", ");

        //prints actual song response - artists, song name, preview url, and album
        logOutput("Artist(s): " + artists);
        logOutput("Song: " + response.tracks.items[0].name);
        logOutput("Spotify Preview URL: " + response.tracks.items[0].preview_url);
        logOutput("Album Name: " + response.tracks.items[0].album.name);
      })
      .catch(function(err) {
        console.log(err);
      })
    // function (err, response) {
    //     if (err) {
    //         logOutput(err)
    //     }

        // limit Spotify modules returns from 20 to 1 song.
       
    //});

};

//When no song title provided, defaults to No Brainer - Justin Bieber
//function lookupSpecificSong();

//Calls Spotify API to retrieve basic song
// spotify.search({ type: "track", id: "5WvAo7DNuPRmk4APhdPzi8" },
//   function (err, data) {
//     if (err) {
//         logOutput.error(err);
//         return
//     }

    // logOutput("Artist: " + data.artists[0].name);
    // logOutput("Song: " + data.name);
    // logOutput("Spotify Preview URL: " + data.preview_url);
    // logOutput("Album Name: " + data.album.name);


// });





// Use fs to take the text inside random.txt and do something
/* function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            logOutput(error);
        } else {
            //Creates array with data
            var randomArray = data.split(",");
            //Sets action to first Array item
            action = randomArray[0];

            //third argument is second array item
            argument = randomArray[1];

            //Main controller call to do something based on action/arg
            doSomething(action, argument);
        }
    });

}

//Logs data to the terminal and output to a text file*/
function logOutput(logText) {
    log.info(logText);
    console.log(logText);
}


// doSomething(action)


