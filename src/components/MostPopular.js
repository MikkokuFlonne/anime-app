import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Animes from './Animes';
import Nav from './Nav';


export default function MostPopular() {

    const [animes, setAnimes] = useState(null);

    let getPopular = (nPage) => {

        // Here we define our query as a multi-line string
        // Storing it in a separate .graphql/.gql file is also possible
        var query = `
        query ($page: Int){
            Page(page: $page, perPage: 15) {
              media(sort: SCORE_DESC, type: ANIME) {
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
                return response.ok ? setAnimes(json.data.Page.media) : Promise.reject(json);
            });
        }

    }

    useEffect(() => {
        getPopular(1)

    }, [])





    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText} >Most Popular</Text>
            </View>
            <View style={styles.catalogue}>

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
                    : <View/>
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