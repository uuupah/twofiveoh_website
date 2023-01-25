addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
const clientId = SPOTIFY_CLIENT_ID;

const clientSecret = SPOTIFY_CLIENT_SECRET;

const showId = "39lr9bBUcXgZRXsxTw1axM";
const requestLimit = 50;
const requestOffset = 0;

const spotifyTokenEndpoint = "https://accounts.spotify.com/api/token";
// note that the market is absolutely fucking VITAL here. despite it being optional, the
// endpoint returns a 404 without it
const spotifyEpisodesEndpoint = `https://api.spotify.com/v1/shows/${showId}/episodes?market=AU&limit=${String(requestLimit)}&offset=`

/**
 * respond with json of spotify info
 * @param {Request} request
*/
async function handleRequest(request) {
  // new bearer token can be grabbed from here
  // https://developer.spotify.com/console/get-show-episodes/?id=39lr9bBUcXgZRXsxTw1axM&market=&limit=&offset=
  // if one is needed for development
  // const bearerToken = "";

  const bodyParams = new URLSearchParams()
  bodyParams.append("grant_type", 'client_credentials')

  const basic = btoa(`${clientId}:${clientSecret}`);

  const getAccessToken = async () => {
    var response = await fetch(spotifyTokenEndpoint, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }),
    });

    return response.json();
  };

  var { access_token } = await getAccessToken();

  var episodes = [];
  var out = [];

  for (let i = 0; i < 7; i++) {
    var response = await fetch(spotifyEpisodesEndpoint + String(50 * i), {
      headers: {
        'Authorization': `Bearer ${access_token}`
      },
    })

    var jsonResponse = await response.json();
    var contents = JSON.parse(JSON.stringify(jsonResponse)).items;

    episodes = episodes.concat(contents)
  }

  episodes.forEach(episode => {
    out = out.concat({
      title: episode.name,
      description: episode.description,
      date: episode.release_date,
      image: episode.images[0].url,
      is_playable: episode.is_playable,
    })
  });

  return new Response(JSON.stringify(out), response);
}

// https://github.com/BehnH/spotify-workers/blob/main/src/utils/spotify.js