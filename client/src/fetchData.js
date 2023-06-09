async function FetchGameData(props) {
  const data = {};
  const gameId = props.id;

  //general information about the game, such as an about, dlc appid's, release date, supported platforms etc.
  const callGameDetails = await fetch(`http://localhost:${process.env.REACT_APP_PORT}/gameDetails/${gameId}`,{mode:'cors'})
    .then(response => response.json())
    .then(data => {
      //console.log('Game Details:', data[gameId].data);
      return data[gameId].data;
    })
    .catch(error => {
      console.error('request failed', error);
    });

  //api call for game pricing information based on appid of game
  const callGamePrice = await fetch(`http://localhost:${process.env.REACT_APP_PORT}/gamePrice/${gameId}`,{mode:'cors'})
    .then(response => response.json())
    .then(data => {
      //console.log('Cost:', data[gameId].data.price_overview);
      return data[gameId].data.price_overview;
    })
    .catch(error => {
      console.error('request failed', error);
    });

  //api call for game player count based on appid of game
  const callPlayerCount = await fetch(`http://localhost:${process.env.REACT_APP_PORT}/playerCount/${gameId}`,{mode:'cors'})
    .then(response => response.json())
    .then(data => {
      //console.log('Current Player Count:', data.response.player_count);
      return data.response.player_count;
    })
    .catch(error => {
      console.error('request failed', error);
    });

  //api call for game review information based on appid of game
  const callGameReviews = await fetch(`http://localhost:${process.env.REACT_APP_PORT}/reviews/${gameId}`,{mode:'cors'})
    .then(response => response.json())
    .then(data => {
      //console.log('Game Reviews:', data);
      return data;
    })
    .catch(error => {
      console.error('request failed', error);
    });

  //save data to obeject to be returned
  data.gameDetails = callGameDetails;
  data.price = callGamePrice;
  data.players = callPlayerCount;
  data.reviews = callGameReviews;

  console.log('Game data', data);

  return data;
}
export default FetchGameData;
