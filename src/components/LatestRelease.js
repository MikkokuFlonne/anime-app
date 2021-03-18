import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AnimesRelease from './AnimesRelease';
import Nav from './Nav';



export default function LatestAnime() {

    const [animes, setAnimes] = useState(null);

    let getLatestRelease = (nPage) => {

        // Here we define our query as a multi-line string
        // Storing it in a separate .graphql/.gql file is also possible
        var query = `
        query ($page: Int){
                Page(page: $page, perPage: 15) {
                  airingSchedules(notYetAired:false, sort:TIME_DESC) {
                    timeUntilAiring
                    episode
                    media {
                      title {
                        romaji
                        english
                      }
                      isAdult
                      id
                      coverImage {
                        extraLarge
                        large
                        medium
                      }
                    }
                  }
                }
              }
          
        `;

        // Define our query variables and values that will be used in the query request
        var variables = {
            page: nPage,
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
                return response.ok ? setAnimes(json.data.Page.airingSchedules) : Promise.reject(json);
            });
        }
    }




    useEffect(() => {
        getLatestRelease(1)

    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText} >Latest Release</Text>
            </View>
            <View style={styles.catalogue}>

                {animes ?
                    <FlatList
                        data={animes}
                        renderItem={
                            ({ item }) => <AnimesRelease infos={item} />
                        }
                        keyExtractor={(infos) => infos.media.id}
                        horizontal={false}
                        numColumns={3}
                    />
                    : <View />
                }


            </View>
            <Nav />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
        backgroundColor: '#80bfff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flex: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 300,
        borderRadius: 5,
        marginTop: 10
    },
    headerText: {
        color: 'white',
        fontSize: 30,
    },
    catalogue: {
        flex: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    }


});