# Udacity Capstone Project - Travel App

## Table of Contents

* [Introduction](#Introduction)
* [Setting up the application](#setting-up-the-application)

## Introduction

The code in this repository represents the result of the final project from the Udacity Front Ent
Web
Developer nanodegree. This project is a travel app that obtains a desired trip location &amp; date from the user,
displays weather and an image of the location using information obtained from different external APIs that depend on
each-other's response. It is possible to add as many trips and also remove them as needed.

## Setting up the application

### Clone git repository

Open the terminal and move to the directory where you want to store the files:

```
cd <path to your project folder>
```

Clone the project from this git repository:

```
git clone <Github-Repository-URL>
```

### Install dependencies

Install the dependencies with Node Package Manager.

```
npm install
```

This project has the following dependencies:

```
@babel/core
@babel/preset-env
babel-loader
body-parser
clean-webpack-plugin
cors
css-loader
dotenv
express
html-webpack-plugin
jest
mini-css-extract-plugin
node-fetch
sass
sass-loader
style-loader
webpack
webpack-cli
webpack-dev-server
workbox-webpack-plugin
```

### Obtain API Keys

In this project the APIs from GeoNames, Weatherbit and Pixabay are used.

#### GeoNames

Open [GeoNames](https://www.geonames.org/login) and create an account to receive your
personal API key.

#### WeatherBit

Open [Weatherbit](https://www.weatherbit.io/account/create) and create an account to receive your
personal API key.

#### Pixabay

Open [Pixabay](https://pixabay.com/) and create an account to receive your
personal API key.

### Create *.env* file

API keys are like private keys. As the name already says, the information is private and **should not** be visible to
anyone else except you. To prevent your API from disclosing to the public, go to the *root* directory of
your project and create a *.env* file. Within the *.env* file, create a variable for every single key (for example **"GEONAME_KEY="**) and add the API key as
follows:

```
GEONAME_KEY=****************************
WEATHERBIT_KEY=****************************
PIXABAY_KEY=****************************
```

### Start express server and run the program

This project has a *test*, *development* and *production* mode.

To run the *unit tests*, type in the following command:

```
npm run test
```

To run the *development* mode, type in the following command:

```
npm run build-dev
```

To run the *production* mode, type in the following command:

```
npm run build-prod
```

To start the *express server*, type in the following command:

```
npm start
```

### Open the web application

Open your web browser at http://localhost:8081/

