import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';

export default function Anime() {

    const navigation = useNavigation();
    const route = useRoute();

    const [randomAnimes, setRandomAnimes] = useState(null);
    const [rndNumber, setRndNumber] = useState(null);

    let rnd = (range) => {
       setRndNumber(Math.floor(Math.random() * range) + 1)
    }

    let getRange = () => {

        var query = `
        query ($page: Int) {
            Page(page: $page, perPage: 1) {
              pageInfo {
                total
              }
              media (isAdult: false, type: ANIME, status_in: [FINISHED,RELEASING] ) {
                id
              }
            }
          }
        `

        var url = 'https://graphql.anilist.co',
            options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: query,
                })
            };

        fetch(url, options).then(handleResponse)

        function handleResponse(response) {
            return response.json().then(function (json) {
                if (response.ok) {
                    return rnd(json.data.Page.pageInfo.total)
                }
                else {
                    Promise.reject(json)
                }
            })
        }
    }

    let getRandomAnime = (nPage) => {

        // Here we define our query as a multi-line string
        // Storing it in a separate .graphql/.gql file is also possible
        var query = `
        query ($page: Int) {
            Page(page: $page, perPage: 1) {
              media (isAdult: false, type: ANIME, status_in: [FINISHED,RELEASING] ) {
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
                description
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
                if (response.ok) {
                    return setRandomAnimes(json.data.Page.media[0]);
                }
                else {
                    Promise.reject(json)
                }
            })
        }
    }


    useEffect(() => {
        getRange()
    }, [])

    useEffect(() =>{

        rndNumber != null ? getRandomAnime(rndNumber) : console.log('attente du chargement');

    },[rndNumber])


    return (


        <View style={styles.container}>
            { randomAnimes ?
                <>


                    <Pressable onPressOut={() => navigation.navigate('Details Anime', { page: randomAnimes.id })} style={styles.button} >
                        <Image style={styles.image}
                            source={{
                                uri: randomAnimes.coverImage.extraLarge
                            }}
                        />
                    </Pressable>



                    <View style={styles.details}>
                        <View style={styles.title}>
                            <Text style={styles.titleText}>{randomAnimes.title.english == null ? randomAnimes.title.romaji : randomAnimes.title.english}</Text>
                        </View>

                        <ScrollView style={styles.overview}>
                            <Text style={styles.overviewText}>{randomAnimes.description}</Text>
                        </ScrollView>

                    </View>
                </>
                : <View style={{ backgroundColor: 'green' }} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 20,
        marginVertical: 10,
        padding: 10,
        width: 350,
        justifyContent: 'center',
        alignItems:'center',


    },

    infos: {
        flex: 8,

    },
    poster: {
        flex: 1,
    },
    button: {
        flex: 7,

    },
    image: {
        flex: 1,
        resizeMode: 'contain',
        width: 300,
    },
    details: {
        flex: 3,
        width: 300,
    },
    title: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
    titleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 13,
    },
    overview: {
        flex: 20,
        backgroundColor: 'white',
        paddingHorizontal: 5
    },
    overviewText: {
        color: 'black',
        fontSize: 12,
        textAlign: 'center',
    },
})