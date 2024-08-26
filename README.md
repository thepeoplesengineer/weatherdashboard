# Weather Dashboard

## Description

The Weather Dashboard is a web application that allows users to search for the current weather and a 5-day forecast for any city. It leverages the OpenWeatherMap API to fetch weather data based on the user's input and displays it in a user-friendly interface. The application is designed to help travelers or anyone interested in weather conditions to plan their activities accordingly.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [License](#license)

## Installation

To get started with the Weather Dashboard locally, follow these steps:

1. **Clone the repository**
2. **Install dependencies**
3. **Set-Up Environment Variables and get API Key**
4. **Build client**
5. **Run Server**
   
## Usage
To use the Weather Dashboard:

Enter the name of a city into the search bar and click the "Search" button.
The dashboard will display the current weather conditions and a 5-day forecast for the specified city.

Previous searches are saved and can be clicked to quickly view the weather for those cities again.

## Tech Utilized

HTML, CSS, JavaScript (ES6+)
Vite for fast frontend development
Fetch API for making HTTP requests
Backend:

Node.js
Express.js
OpenWeatherMap API


## API Reference
The application uses the following OpenWeatherMap APIs:

Current Weather Data:

Endpoint: https://api.openweathermap.org/data/2.5/weather
Parameters: lat, lon, appid
Geocoding API (for getting coordinates based on city name):

Endpoint: http://api.openweathermap.org/geo/1.0/direct
Parameters: q (city name), appid

## Deployment

Deploy the frontend:

Use a service like Vercel, Netlify, or GitHub Pages to deploy the client/dist folder.
Deploy the backend:

Use a service like Heroku, Render, or AWS to deploy the Node.js backend.
Ensure that the environment variable API_KEY is set on the server.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

