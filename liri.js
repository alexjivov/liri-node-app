require("dotenv").config();

// NPM module for Twitter API
var twitter = require("twitter");

// Used to access keys.js
var twitterKeysFile = require("./keys.js");

// NPM module for Twitter API
var spotify = require("spotify");

// NPM module for OMDB API
var request = require("request");

// NPM module used to read the random.txt file
var fs = require("fs");

// Output files for logs
var filename = './logs.txt';

// NPM module used for logging solution
var log = require('simple-node-logger').createSimpleFileLogger ( filename );

// All log information printed to log.txt
log.SetLevel('all')

// Parameters and Controller
// ---------

// Action request
var action = process.argv[2];

// Request specific information based on action
var argument = "";

// Controller function - which action is taken
function doSomething(action, argument) {
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
        
        //song title argument
        var songTitle = argument;

        // Default to specific song if no argument
        if (songTitle === "") {
            lookupSpecificSong();
        //Else look up song based ont title
        } else {
            //song info from spotify
            getSongInfo(songTitle);
        }
        break;

        //Gets movie information
        case "movie-this":

        //First gets movie title argument
        var movieTitle = argument;

        // default movie if no movie title provided
        if (movieTitle === "") {
            getMovieInfo("Scarface");
        } else {
            getMovieInfo(movieTitle);
        } 
        break;

        // Gets text inside file, and uses it to do something
        case "do-what-it-says":
        doWhatItSays();
        break;
    }

}

// Return third argument - i.e. song title when requesting song information
function getThirdArgument() {
    
}