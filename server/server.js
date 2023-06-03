const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config({  path: '../.env' });

const port = 8080;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
})

app.get('/', (req, res) => {
  res.send('Welcome to the Steam Dashboard');
})

app.get('/gamelist/:id', (req, res) => {
  const gamesUrl = `https://api.steampowered.com/IStoreService/GetAppList/v1/?key=${process.env.REACT_APP_STEAM_API_KEY}&include_games=true&max_results=50000`;
  const gamesUrl2 = `https://api.steampowered.com/IStoreService/GetAppList/v1/?key=${process.env.REACT_APP_STEAM_API_KEY}&include_games=true&last_appid=${req.params['id']}&max_results=50000`;

  if(req.params['id'] === -1){
    axios
    .get(gamesUrl)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }
  else {
    axios
    .get(gamesUrl2)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  } 
})

app.get('/gameDetails/:id', (req, res) => {
  const gamesUrl = `https://store.steampowered.com/api/appdetails/?appids=${req.params['id']}`;
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
  const gamesUrl = `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=${process.env.REACT_APP_STEAM_API_KEY}&appid=${req.params['id']}`;
  axios
  .get(gamesUrl)
  .then((response) => {
    res.json(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
})

app.get('/reviews/:id', (req, res) => {
  const gamesUrl = `https://store.steampowered.com/appreviews/${req.params['id']}?json=1`;
  axios
  .get(gamesUrl)
  .then((response) => {
    res.json(response.data);
  })
  .catch((error) => {
    console.error(error);
  }); 
})

app.get('/topSellers', (req, res) => {
  const gamesUrl = `https://store.steampowered.com/search/?filter=topsellers`;
  axios
  .get(gamesUrl)
  .then((response) => {
    res.json(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
})

app.get('/topSellersOnSale', (req, res) => {
  const gamesUrl = `https://store.steampowered.com/search/?supportedlang=english&specials=1&filter=topsellers&ndl=1`;
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
  console.log(`listening on port ${port}`);
})