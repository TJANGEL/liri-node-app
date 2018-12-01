# LIRI Bot App

Language Interpretation and Recognition Interface that allows users to input simple text commands.

LIRI will search for concerts, movies, and song information with simple commands:

    `concert-this`

    `spotify-this-song`

    `movie-this`

    `do-what-it-says`
    
    
## Getting Started
Create your own Spotify and API keys and replace it with the information in the file called .env.

Spotify API keys:
SPOTIFY_ID=your-spotify-id 
SPOTIFY_SECRET=your-spotify-secret

NPM Installations
Navigate to the root of your project. Then in the terminal command line run `npm init -y`, this will initalize a package.json for your project.

Include the following NPM installations:

`npm dotenv`, `npm node-spotify-api`, `npm request`, `npm axoios`, `npm moment`, `npm fs`

### Built With:

    Visual Studio Code (https://code.visualstudio.com) - Text editor
    
    Javascript
    
    Node.js (https://nodejs.org/en) - Framework used
    
    JSON (http://www.json.org) - Data format used
    
    Axios
    
    Moment
    
    DotEnv
    
    BandsInTown API (http://www.artists.bandsintown.com/bandsintown-api) - API for Concerts
    
    Spotify API (https://developer.spotify.com/documentation/web-api) - API for music
    
    OMDB API (http://www.omdbapi.com) - API for movies

# Demo of functioning app:

   Bands In Town: `node liri.js concert-this '<artist name here>'`
   
        Screenshot:

   
   Spotify: `node liri.js spotify-this-song '<song name here>'`
        
 # ![Spotify](https://github.com/TJANGEL/liri-node-app/blob/master/images/Spotify-interact-Screenshot.png)
   
   OMDB: `node liri.js movie-this '<movie name here>'`
        
 # ![OMDB](https://github.com/TJANGEL/liri-node-app/blob/master/images/OMDB-interact-Screenshot.png)

   Do What it Says: `node liri.js do-what-it-says'
        
 # ![](images/do-what-it-says-screenshot.png)

   How data is formatted when appended to log.txt file:
        
 # ![log.txt](https://github.com/TJANGEL/liri-node-app/blob/master/images/log.txt-screenshot.png)

   Error Response:
  
 # ![Error Response](https://github.com/TJANGEL/liri-node-app/blob/master/images/Error-response-Screenshot.png)

   
