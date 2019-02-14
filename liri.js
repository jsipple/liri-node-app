var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: "98940cc92be44c8b9a0a73d40aaa284b",
  secret: "d0831b740ea646828f188d9fb95a1fae"
});

// require("dotenv").config();
// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);


const axios = require("axios");
let arg1 = process.argv[2];
let arg2 = process.argv.splice(3,).join("+");
let artist;
let movie;
const fs = require("fs");

function liri() {
switch (arg1) {
    case "concert-this":
        artist = arg2
        axios({
            method: 'get',
            url: "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp",
        })
        .then(function(response) {
            // need to also add moment in here
            console.log(response.data[0].venue.name)
            console.log(response.data[0].venue.city)
            // need to convert this using moment.js
            console.log(response.data[0].datetime)
        })
        break;
    case "spotify-this-song":
    // saying unauthorized
    // if no arg2 put in the sign by ace of base
    spotify.search({ type: 'track', query: arg2}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        // need to make a for loop for this
      console.log(data.tracks.items[0].artists[0].name); 
      console.log(data.tracks.items[0].name); 
      console.log(data.tracks.items[0].external_urls.spotify); 
      console.log(data.tracks.items[0].album.name); 
      });
        break;
    case "movie-this":
    movie = arg2
    axios({
            url: "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy",
            method: "GET"
          }).then(function(response) {
            console.log(response.data.Title);
            console.log(response.data.Year);
            console.log(response.data.imdbRating);
            // TODO: edit this so that it only runs if there is a rotton tomato score
            console.log(response.data.Ratings[1].Value)
            console.log(response.data.Country)
            console.log(response.data.Language)
            console.log(response.data.Plot)
            console.log(response.data.Actors)
          });
        break;
    case "do-what-it-says":
    // could probably edit it read any file by changing the random.txt to a variable with txt always added to it
        const read = fs.readFileSync('./random.txt', "utf-8")
        let reading = read.split(" ")
        arg1 = reading[0]
        arg2 = reading.splice(1,)
        liri()
        break;
}
}
liri()