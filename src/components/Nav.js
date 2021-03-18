import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';



export default function Nav() {

    const navigation = useNavigation();
    const route = useRoute();


    return (       
        

        <View style={styles.container}>

            {route.name == "Latest Release" ? null :
                <Pressable style={styles.button} onPress={() => navigation.navigate('Latest Release', { page: 'Latest Release' })}>
                    <Text style={styles.buttonText}>Latest Release</Text>
                </Pressable>
            }
            {route.name == "Most Popular" ? null :
                <Pressable style={styles.button} onPress={() => navigation.navigate('Most Popular', { page: 'Most Popular' })}>
                    <Text style={styles.buttonText}>Most popular</Text>
                </Pressable>
            }
            {route.name == "Home" ? null :
                <Pressable style={styles.button} onPress={() => navigation.navigate('Home', { page: 'Home' })}>
                    <Text style={styles.buttonText}>Home</Text>
                </Pressable>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-around',
        width: 400,
        marginTop: 5,
        marginBottom: 18
    },
    button: {
        backgroundColor: '#cc99ff',
        width: '30%',
        height: 40,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})