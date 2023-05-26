const express = require('express');
const axios = require('axios');
const app = express();
const port = 8080;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
})

app.get('/', (req, res) => {
    res.send('Welcome to the Steam Dashboard')
})
app.get('/gamelist', (req, res) => {
    const gamesUrl = 'https://api.steampowered.com/ISteamApps/GetAppList/v2/';
    axios
    .get(gamesUrl)
    .then((response) => {
        res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
    
})

app.get('/gamePrice/:id', (req, res) => {
    const gamesUrl = `https://store.steampowered.com/api/appdetails?filters=price_overview&appids=${req.params['id']}&cc=us&l=en`;
    axios
    .get(gamesUrl)
    .then((response) => {
        res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
    
})

app.get('/playerCount/:id', (req, res) => {
    const gamesUrl = `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?format=json&appid=${req.params['id']}`;
    axios
    .get(gamesUrl)
    .then((response) => {
        res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
    
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})