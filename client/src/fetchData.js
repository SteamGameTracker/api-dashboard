async function FetchGameData(props) {
  const data = {};
  const gameId = props.id;


  const callGamePrice = await fetch(`http://localhost:8080/gamePrice/${gameId}`,{mode:'cors'})
    .then(response => response.json())
    .then(data => {
        console.log('Cost:', data[gameId].data.price_overview);
        return data[gameId].data.price_overview;
    })
    .catch(error => {
      console.error('request failed', error);
    });

  const callPlayerCount = await fetch(`http://localhost:8080/playerCount/${gameId}`,{mode:'cors'})
    .then(response => response.json())
    .then(data => {
        console.log('Current Player Count:', data.response.player_count);
        return data.response.player_count;
    })
    .catch(error => {
      console.error('request failed', error);
    });


  const callGameReviews = await fetch(`http://localhost:8080/reviews/${gameId}`,{mode:'cors'})
  .then(response => response.json())
  .then(data => {
      console.log('Game Reviews:', data);
      return data;
  })
  .catch(error => {
    console.error('request failed', error);
  });

  data.price = callGamePrice;
  data.players = callPlayerCount;
  data.reviews = callGameReviews;

  console.log('Game info', data);

  return data;
}

export default FetchGameData;