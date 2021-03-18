import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

import Nav from './Nav';


export default function AnimeDetails({ route }) {


    const [details, setDetails] = useState(null);

    let getDetails = (id) => {

        // Here we define our query as a multi-line string
        // Storing it in a separate .graphql/.gql file is also possible
        var query = `
        query ($id: Int) {
            Media(id: $id, type: ANIME) {
              id
              title {
                romaji
                english
                native
              }
              coverImage {
                extraLarge
                large
                medium
              }
              format
              genres
              episodes
              averageScore
              description
              popularity
              status
              trailer {
                id
                site
                thumbnail
              }
              rankings {
                context
                rank
              }
            }
          }
          
        `;

        // Define our query variables and values that will be used in the query request
        var variables = {
            id: id,
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
                return response.ok ? setDetails(json.data.Media) : Promise.reject(json).catch(err => {
                    console.log(err)
                })
            });
        }

    }

    useEffect(() => {
        getDetails(route.params.page)

    }, [])


    return (


        <View style={styles.container}>

            {details ?
                <View style={styles.anime}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>{details.title.english == null ? details.title.romaji : details.title.english}</Text>
                    </View>
                    <View style={styles.zoom}>
                        <Image style={styles.poster}
                            source={{
                                uri: details.coverImage.extraLarge
                            }}
                        />
                    </View>

                    <ScrollView style={styles.details}>
                        <View style={styles.infos}>
                            <Text>Title : {details.title.native}, {details.title.romaji}</Text>
                            <Text>Format : {details.format} </Text>
                            <Text>Genres : {details.genres + ''}  </Text>

                            {details.episodes == 1 ? <View /> :
                                <Text>Number of episodes : {details.episodes}</Text>
                            }

                            <Text>Ranking : {details.rankings.length <= 0 ? 'No information' : details.rankings[0].rank}</Text>
                            <Text>Popularity score : {details.averageScore}</Text>
                            <Text>Status : {details.status} </Text>

                            {details.trailer == null ? <View /> :
                                <Text>Vidéo : {details.trailer.site == 'youtube' ? 'https://www.youtube.com/watch?v=' + details.trailer.id : 'No trailer available'}</Text>
                            }
                        </View>
                        <View style={styles.overview}>
                            <Text style={styles.overviewText}>{details.description}</Text>
                        </View>

                    </ScrollView>
                </View>
                : <View />
            }
            <Nav />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    anime: {
        flex: 20,
    },
    title: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60
    },
    titleText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    zoom: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 500,
        marginTop: 10
    },
    poster: {
        flex: 4,
        width: 300,
        height: 500,
        resizeMode: 'contain'
    },
    details: {
        flex: 1,
        margin: 10,


    },
    infos: {
        flex: 1,
        backgroundColor: 'white',
    },
    overview: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    overviewText: {
        color: 'black',
        fontWeight: '600',
        fontSize: 14,
    },
    video:{
        flex: 1,
    }

})