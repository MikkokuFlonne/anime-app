import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

export default function Animes({ infos }) {

    const navigation = useNavigation();
    const route = useRoute();

    return (
        <Pressable onPress={() => navigation.navigate('Details Anime', { page: infos.id })} style={styles.button}>

            <View style={styles.container}>
                <Image style={styles.poster}
                    source={{
                        uri: infos.coverImage.large
                    }}
                />
                <View style={styles.title}>
                    <Text style={styles.titleText}>{infos.title.english == null ? infos.title.romaji : infos.title.english}</Text>
                </View>
            </View>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        width: '30%',
        height: 170,
        margin: 5
    },
    container: {
        flex: 10,
    },
    poster: {
        flex: 10,
        resizeMode: 'contain'
    },

    title: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        height: 30,
    },
    titleText: {
        color: 'white',
        fontSize: 11,
        textAlign: 'center',
    },
})