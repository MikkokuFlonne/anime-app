import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Anime from './Anime';
import Nav from './Nav';



export default function Home() {



    return (

        <View style={styles.container} >
            <View style={styles.header}>
                <Text style={styles.headerText}>Anime of the day</Text>
            </View>
            <Anime/>            
            <Nav />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#80bfff',
        justifyContent: 'center',
        alignItems: 'center'
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


});