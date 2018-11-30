require("dotenv").config();

var keys = require("./keys.js");

var divider = "\n----------------------------------\n"



// Bands In Town Function
// var BandsInTown = require('bandsInTown');

// "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

// Name of Venue
// Venue location
// Dete of Event (use moment to format this as "MM/DD/YYYY")

// //Bands In Town Keys
// var activeKeys = require('./keys.js');

function bandWrite () {
	var request = require('request');

	var artist;
	var comboTerm = "";

	for (var i = 3; i < process.argv.length; i++) {
		comboTerm += process.argv[i] + " ";
	}

	if (process.argv[2] == "concert-this" && process.argv[3] != undefined) {
		artist = comboTerm;
	}
	else if (process.argv[2] == "do-what-it-says") {
		artist = readQuery;
	}

	var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

	request(queryURL, function (error, response, body) {
		var obj = JSON.parse(body);

		if (error) {
			return console.log(error);
		}
		else if (obj.Response == "False") {
			return console.log("No Artist Found");
		}

		var bandMessage = "Venue Name: " + obj.Venue + "\nVenue Location: " + obj.Location + "\nDate of Concert: " + obj.Date;

		bandMessage += divider;

		console.log(divider + bandMessage);

		fs.appendFile("log.txt", bandMessage, function (err) {
			if (err) {
				console.log(err);
			}
		})

	})
}

// // bandWrite ();

//Spotify Function
var Spotify = require('node-spotify-api');

var spotify = new Spotify (keys.spotify);

function spotifyWrite () {

	var queryTerm;
	var comboTerm = "";

	for (var i = 3; i < process.argv.length; i++) {
		comboTerm += process.argv[i] + " ";
	}

	if (process.argv[2] == "spotify-this-song" && process.argv[3] != undefined) {
		queryTerm = comboTerm;
	}
	else if (process.argv[2] == "spotify-this-song" && process.argv[3] == undefined) {
		queryTerm = "The Sign, Ace of Base";
	}
	else if (process.argv[2] == "do-what-it-says") {
		queryTerm = readQuery;
	}

	spotify.search({type: 'track', query: queryTerm, limit: 1}, function (err, data) {

		if (data.tracks.items[0] == undefined) {
			console.log("No Song Found");
			return;
		}

		var artist = data.tracks.items[0].artists[0].name;

		for (var i = 1; i < data.tracks.items[0].artists.length; i++) {
			artist += ", " + data.tracks.items[0].artists[i].name;
		}

		var songMessage = "Artist: " + artist + "\nSong: " + data.tracks.items[0].name  + "\nLink: " + data.tracks.items[0].external_urls.spotify + "\nAlbum: " + data.tracks.items[0].album.name;

		songMessage += divider;

		console.log(divider + songMessage);

		fs.appendFile("log.txt", songMessage, function (err) {
			if (err) {
				console.log(err);
			}
		})
	})
}

// spotifyWrite();

//OMDB Function
function movieWrite () {
	var request = require('request');

	var queryTerm;
	var comboTerm = "";

	for (var i = 3; i < process.argv.length; i++) {
		comboTerm += process.argv[i] + " ";
	}

	if (process.argv[2] == "movie-this" && process.argv[3] != undefined) {
		queryTerm = comboTerm;
	}
	else if (process.argv[2] == "movie-this" && process.argv[3] == undefined) {
		queryTerm = "Mr. Nobody";
	}
	else if (process.argv[2] == "do-what-it-says") {
		queryTerm = readQuery;
	}

	var queryURL = "http://www.omdbapi.com/?t=" + queryTerm + "&apikey=3d7218e1"

	request(queryURL, function (error, response, body) {
		var obj = JSON.parse(body);

		if (error) {
			return console.log(error);
		}
		else if (obj.Response == "False") {
			return console.log("No Movie Found");
		}

		var movieMessage = "Title: " + obj.Title + "\nYear: " + obj.Year + "\nIMDB Rating: " + obj.Ratings[0].Value + "\nRotten Tomatoes Rating: " + obj.Ratings[1].Value + "\nCountry: " + obj.Country + "\nLanguage: " + obj.Language + "\nPlot: " + obj.Plot + "\nActors: " + obj.Actors;

		movieMessage += divider;

		console.log(divider + movieMessage);

		fs.appendFile("log.txt", movieMessage, function (err) {
			if (err) {
				console.log(err);
			}
		})

	})
}

// movieWrite();

//DoThis Function
var readQuery;
var fs = require("fs");

function doThisWrite () {

	fs.readFile("random.txt", "utf8", function (err, data) {

		if (err) {
			return console.log(err);
		}

		data = data.split(", ")

		readQuery = data[1];

		if (data[0] == "concert-this") {
		 	bandWrite();
		}
		else if (data[0] == "spotify-this-song") {
		 	spotifyWrite();
		}
		else if (data[0] == "movie-this") {
		    movieWrite();
		}

	})

}

// doThisWrite ();

var action = process.argv[2];

switch (action) {
	case "concert-this":
		bandWrite();
		break;

	case "spotify-this-song":
		spotifyWrite();
		break;

	case "movie-this":
		movieWrite();
		break;

	case "do-what-it-says":
		doThisWrite();
		break;
	default:
		console.log("Please Use a Working Command: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says");
		break;
}