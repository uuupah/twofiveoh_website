addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request, event))
})

const clientId = SPOTIFY_CLIENT_ID;
const clientSecret = SPOTIFY_CLIENT_SECRET;
const omdbKey = OMDB_API_KEY;

const showId = "39lr9bBUcXgZRXsxTw1axM";
const requestLimit = 50;
const requestOffset = 0;

const spotifyTokenEndpoint = "https://accounts.spotify.com/api/token";
// note that the market is absolutely fucking VITAL here. despite it being optional, the
// endpoint returns a 404 without it
const spotifyEpisodesEndpoint = `https://api.spotify.com/v1/shows/${showId}/episodes?market=AU&limit=${String(requestLimit)}&offset=`
const omdbEndpoint = `http://img.omdbapi.com/?apikey=${omdbKey}&t=`
const imdbotEndpoint = 'https://search.imdbot.workers.dev/?q='
/**
 * respond with json of spotify info
 * @param {Request} request
*/
async function handleRequest(request, event) {
  // const request = event.request;
  const cacheUrl = new URL(request.url);

  // Construct the cache key from the cache URL
  const cacheKey = new Request(cacheUrl.toString(), request);
  const cache = caches.default;

  // Check whether the value is already available in the cache
  // if not, you will need to fetch it from origin, and store it in the cache
  // for future access
  let cachedResponse = await cache.match(cacheKey);

  if (!cachedResponse) {
    console.log(
      `Response for request url: ${request.url} not present in cache. Fetching and caching request.`
    );

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

    for (const episode of episodes) {
      // // messing about to try and get posters
      // var title = episode.name.split(' - ')[1]
      // var poster = '';
      // if (title) {
      //   console.log(title.replace(' ', '+'))
      //   var posterResponse = await fetch(imdbotEndpoint + title.replace(' ', '+')) 
      //   // poster = JSON.parse(JSON.stringify(posterResponse)).description;
      //   poster = JSON.stringify(posterResponse);
      //   console.log(poster)
      // }

      out = out.concat({
        title: episode.name,
        // poster: poster,
        description: episode.description,
        date: episode.release_date,
        image: episode.images[0].url,
        is_playable: episode.is_playable,
      })
    };

    out.reverse();

    cachedResponse = new Response(JSON.stringify(out), cachedResponse);

    cachedResponse.headers.append('Cache-Control', 's-maxage=3600')
    
    event.waitUntil(cache.put(cacheKey, cachedResponse.clone()));
  } else {
    console.log(`Cache hit for: ${request.url}.`);
  }
  return cachedResponse;
}

    // https://github.com/BehnH/spotify-workers/blob/main/src/utils/spotify.js