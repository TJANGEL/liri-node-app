require("dotenv").config();


var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var moment = require("moment");

var axios = require("axios")

var request = require("request")

var fs = require("fs");

var divider = "\n----------------------------------\n"

// Bands In Town Function

function bandWrite() {
	var artist;
	var queryTerm;
	var comboTerm = "";

	for (var i = 3; i < process.argv.length; i++) {
		comboTerm += process.argv[i] + " ";
	}

	if (process.argv[2] == "concert-this" && process.argv[3] != undefined) {
		queryTerm = comboTerm;
	}
	else if (process.argv[2] == "do-what-it-says") {
		queryTerm = readQuery;
	}

	var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

	axios.get(queryURL).then(
		function (response) {
			
			console.log("\nName of Venue: " + response.data[0].venue.name);
			console.log("\nVenue Location: " + response.data[0].venue.city);
			console.log("\nDate of Event: " + moment(response.data[0].datetime).format("MM-DD-YYYY"))

			var bandMessage = "Venue: " + response.data[0].venue.name + "\nVenue Location: " + response.data[0].venue.city + "\nDate of Event: " + moment(response.data[0].datetime).format("MM-DD-YYYY");

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

var spotify = new Spotify(keys.spotify);

function spotifyWrite() {

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

	spotify.search({ type: 'track', query: queryTerm, limit: 1 }, function (err, data) {

		if (data.tracks.items[0] == undefined) {
			console.log("No Song Found");
			return;
		}

		var artist = data.tracks.items[0].artists[0].name;

		for (var i = 1; i < data.tracks.items[0].artists.length; i++) {
			artist += ", " + data.tracks.items[0].artists[i].name;
		}

		var songMessage = "Artist: " + artist + "\nSong: " + data.tracks.items[0].name + "\nLink: " + data.tracks.items[0].external_urls.spotify + "\nAlbum: " + data.tracks.items[0].album.name;

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
function movieWrite() {

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

function doThisWrite() {

	fs.readFile("random.txt", "utf8", function (error, data) {

		if (error) {
			return console.log(error);
		}

		data = data.split(", ")

		console.log(data);

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