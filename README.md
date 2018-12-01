# LIRI Bot App

Language Interpretation and Recognition Interface that allows users to input simple text commands.

LIRI will search for concerts, movies, and song information with simple commands:

    `concert-this`

    `spotify-this-song`

    `movie-this`

    `do-what-it-says`

## Built With:

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

        Screenshot:
        
        ![Spotify](https://github.com/TJANGEL/liri-node-app/blob/master/images/Spotify-interact-Screenshot.png)
   
   
   OMDB: `node liri.js movie-this '<movie name here>'`

        Screenshot:
        
        ![OMDB](https://github.com/TJANGEL/liri-node-app/blob/master/images/OMDB-interact-Screenshot.png)

   Do What it Says: `node liri.js do-what-it-says'

        Screenshot:
        
        ![](images/do-what-it-says-screenshot.png)

   How data is formatted when appended to log.txt file:

        Screenshot:
        
        ![log.txt](https://github.com/TJANGEL/liri-node-app/blob/master/images/log.txt-screenshot.png)

   Error Response:

        Screenshot:
        
        ![Error Response](https://github.com/TJANGEL/liri-node-app/blob/master/images/Error-response-Screenshot.png)

   
