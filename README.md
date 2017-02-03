# Weather API with Node and React

Attempt at creating a node/react weather checker.

It should display the temp and time for certain cities.

## Getting Started

Clone the git repository, cd into the weather-app and run...
*npm install*

You will need to create a file called secrets.json in the main directory and insert your API key into this file like below:

{
  "key": "yourkeyhere"
}

Before running start, make sure the server is running:
*npm run server*

This is required in order to send requests to the weather API.

Once cloned, get the app going requires:
*npm run start*

It should bring the browser up automatically, but if not, head to http://localhost:3000 to view it.

The page will reload when these servers are running if you make edits.

## Todo:
- Enable multiple locations to be selected
- Design a front page for the data
- Implement D3 to display the data.


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
