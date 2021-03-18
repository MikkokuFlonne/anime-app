export let getAPI = (nPage, sort)=>{

    // Here we define our query as a multi-line string
    // Storing it in a separate .graphql/.gql file is also possible
    var query = `
    query ($page: Int){
        Page(page: $page, perPage: 15) {
          media(sort: , type: ANIME) {
            id
            title {
              english
              romaji
              native
            }
            coverImage {
                extraLarge
                large
                medium
            }                
          }
        }
      }
      
    `;

    // Define our query variables and values that will be used in the query request
    var variables = {
        page: nPage,
        sort: sort
    };

    // Define the config we'll need for our Api request
    var url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

    // Make the HTTP Api request
    fetch(url, options).then(handleResponse)

    function handleResponse(response) {
        return response.json().then(function (json) {
            return response.ok ? json.data.Page.media : Promise.reject(json);
        });
    }
}


{animes ?
    <FlatList
        data={animes}
        renderItem={
            ({ item }) => <Animes infos={item} />
        }
        keyExtractor={(infos) => infos.id}
        horizontal={false}
        numColumns={3}
    />
    : <View />
}