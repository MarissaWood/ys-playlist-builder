# Yoga Sculpt Playlist Builder

## Description

This app searches Spotify's music library for songs and display's audio data relevant to fitness instructors.  I built this app because I use Spotify to make my class playlists and I wanted an easy way to see the BPM of songs in their database. 

# ![ysplaylist](https://user-images.githubusercontent.com/26101268/43541351-35447b66-9598-11e8-8271-60639a0a450a.png)

## Technologies Used

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).  It uses Spotify's Web API.  This app does not have its own database for storing any user data, it is just a platform for accessing Spotify's data.  

## Features

After a user authenticates with Spotify's OAuth, they can search for tracks by song title or artist name. Each track will display data that is relevant to choosing music for a yoga sculpt playlist.  

Spotify's web API requires a token, so users need to sign in to get a token to perform searches.  

# ![ysplaylist2](https://user-images.githubusercontent.com/26101268/43542372-ca6005b0-959a-11e8-8c2d-b69180156c02.png)

## Installation instructions 

To run this project locally, clone this repository, run ``` $ npm install```, run ```$ npm start ```, and navigate to localhost:3000 

a deployed version of this app can be found at [http://ys-playlist.surge.sh](http://ys-playlist.surge.sh) 

## Unsolved problems 

I am still working on a way for users to save the songs to a playlist that will display on the screen.  I would also like to add the functionality for users to save the playlist to their spotify accounts.  