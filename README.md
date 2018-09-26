# Yoga Sculpt Playlist Builder

## Description

This app searches Spotify's music library for songs and display's audio data relevant to fitness instructors.  I built this app because I use Spotify to make my class playlists and I wanted an easy way to see the BPM of songs in their database. 



## Technologies Used

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).  It uses Spotify's Web API.  This app does not have its own database for storing any user data, it is just a platform for accessing Spotify's data.  

## Features

After a user authenticates with Spotify's OAuth, they can search for tracks by song title or artist name. Each track will display data that is relevant to choosing music for a yoga sculpt playlist.  

Spotify's web API requires a token, so users need to sign in to get a token to perform searches.  

# ![screen shot 2018-09-26 at 1 43 08 pm](https://user-images.githubusercontent.com/26101268/46099682-6abf2600-c195-11e8-80d6-c8b99d146d3f.png)


Once signed in, the user can search for songs and add them to a playlist.

# ![screen shot 2018-09-26 at 1 59 22 pm](https://user-images.githubusercontent.com/26101268/46099407-b7eec800-c194-11e8-9834-8996ffb57105.png)

After a user is done building the playlist, they can save it to their Spotify account.  

This app is mobile friendly.  The view changes to just one card at a time.

# ![screen shot 2018-09-26 at 1 51 39 pm](https://user-images.githubusercontent.com/26101268/46099134-ff288900-c193-11e8-9856-208f2d655be1.png)

## Installation instructions 

To run this project locally, clone this repository, run ``` $ npm install```, run ```$ npm start ```, and navigate to localhost:3000 

a deployed version of this app can be found at [http://yog-playlist.surge.sh](http://yog-playlist.surge.sh) 

## Unsolved problems 

In the future I would like to add the following features:
+ drag reorder songs in playlist
+ input field for the name of the playlist they are saving
+ disable the save playlist button after it is clicked to prevent duplicate playlists from being formed.  
+ make the song card disappear from search results after it is added to the playlist.