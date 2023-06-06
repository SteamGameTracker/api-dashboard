const express = require('express');
const axios = require('axios');
const fs = require("fs");
const app = express();
const path = "./gamelist.json";
const path2 = "./top50sellers.json";
const path3 = "./top50onsale.json";
require('dotenv').config({  path: '../.env' });

const port = 8080;
const date = new Date();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
})

app.get('/', (req, res) => {
  res.send('Welcome to the Steam Dashboard');
})

app.get('/gamefile', (req, res) => {
  
  const jsonString = fs.readFileSync(path);
  const testData = JSON.parse(jsonString)
  
  res.json(testData);
})

app.get('/gamelist/:id', (req, res) => {
  const gamesUrl = `https://api.steampowered.com/IStoreService/GetAppList/v1/?key=${process.env.REACT_APP_STEAM_API_KEY}&include_games=true&max_results=50000`;
  const gamesUrl2 = `https://api.steampowered.com/IStoreService/GetAppList/v1/?key=${process.env.REACT_APP_STEAM_API_KEY}&include_games=true&last_appid=${req.params['id']}&max_results=50000`;
  //const date = new Date();
  
  if(req.params['id'] == -1){
    axios
    .get(gamesUrl)
    .then((response) => {
      res.json(response.data);
      
      fs.writeFile(path, JSON.stringify({
        "date": `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        "applist": response.data.response.apps
      }, null, 2), (error) => {
        if(error) {
          console.log("An error has occured", error);
          return;
        }
        console.log("Data written successfully to the file");
      })
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

      fs.readFile(path, (error, data) =>{
        if (error) {
          console.log(error);
          return;
        }

        const parseData = JSON.parse(data);
        const newData = parseData.applist.concat(response.data.response.apps);
        parseData.applist = newData;

        fs.writeFile(path, JSON.stringify(parseData, null, 2), (err) => {
          if(err) {
            console.log("Failed to write updated data to file");
            return;
          }
          console.log("Updated file successfully");
        });
      });
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

app.get('/topSellersJson', (req, res) => {
  const jsonString = fs.readFileSync(path2);
  const topData = JSON.parse(jsonString);
  res.json(topData);
})

app.get('/topSellers', (req, res) => {
  const gamesUrl = `https://store.steampowered.com/search/?filter=topsellers`;
  axios
  .get(gamesUrl)
  .then((response) => {
    const regex = /(?<=https:\/\/store\.steampowered\.com\/app\/).[0-9]+/gm;
    const array = response.data.match(regex);
    let objArray = [];
    Promise.all(array.map(async (appid) => {
      const callGameDetails = `https://store.steampowered.com/api/appdetails/?appids=${appid}`;
      await axios
      .get(callGameDetails)
      .then(response => {
        objArray.push(JSON.parse(JSON.stringify(response.data[appid].data)));
        fs.writeFile(path2, JSON.stringify({
          "date": `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
          "applist": objArray
        }, null, 2), (error) => {
          if(error) {
            console.log("An error has occured", error);
            return;
          }
          console.log("Data written successfully to the file");
        })
      })
      .catch((error) => {
        console.error(error);
      });
    }))
  })
  .catch((error) => {
    console.error(error);
  });
})

app.get('/topSellersOnSaleJson', (req, res) => {
  const jsonString = fs.readFileSync(path3);
  const topSalesData = JSON.parse(jsonString);
  res.json(topSalesData);
})

app.get('/topSellersOnSale', (req, res) => {
  const gamesUrl = `https://store.steampowered.com/search/?supportedlang=english&specials=1&filter=topsellers&ndl=1`;
  axios
  .get(gamesUrl)
  .then((response) => {
    const regex = /(?<=https:\/\/store\.steampowered\.com\/app\/).[0-9]+/gm;
    const array = response.data.match(regex);
    let objArray = [];
    Promise.all(array.map(async (appid) => {
      const callGameDetails = `https://store.steampowered.com/api/appdetails/?appids=${appid}`;
      await axios
      .get(callGameDetails)
      .then(response => {
        objArray.push(JSON.parse(JSON.stringify(response.data[appid].data)));
        fs.writeFile(path3, JSON.stringify({
          "date": `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
          "applist": objArray
        }, null, 2), (error) => {
          if(error) {
            console.log("An error has occured", error);
            return;
          }
          console.log("Data written successfully to the file");
        })
      })
      .catch((error) => {
        console.error(error);
      });
    }))
  })
  .catch((error) => {
    console.error(error);
  });
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})
