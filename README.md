# ÖKGY Énekeskönyv - Songbook

React application to view, create, edit or project song lyrics for Örömhír baptist church (ÖKGY).

## Features

- View the songs from the database in different ways: One or two column mode suited for mobile users, and single verse mode ideal with a projector.
- Adjust font size to maximize the amount of lyrics on the screen.
- Create a playlist of songs and quickly switch between them. The playlist is saved in the browser's local storage.
- Logged in users can create, edit or delete songs from the database. (Registration is not available outside the church.)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000/dicsi](http://localhost:3000/dicsi) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.\

## Built with

- React, react-redux, react-router-dom, redux-form
- Semantic UI, Material UI, react-loader-spinner, react-device-detect, react-tooltip
- Axios, lodash, redux-thunk
- Django backend server hosted on Heroku (free dyno, so first load might take ~10 seconds) with Django REST Framework
