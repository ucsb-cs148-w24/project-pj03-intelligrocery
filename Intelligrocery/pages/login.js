//React Native
import React, { useState, useEffect } from 'react'
import {View, Text, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity, ImageBackground, Alert} from 'react-native'
import { useNavigation } from '@react-navigation/core'

//Firebase
import { auth } from '../firebase'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    useEffect( () => {
        const unsubscribe = auth.onAuthStateChanged( user => {
            if (user) {
                navigation.navigate("Tabs")
            }
        })
        return unsubscribe
    });

    const handleSignUp = async () => {
        try {
          userCredentials = await auth.createUserWithEmailAndPassword(email, password);
          console.log('Registered with: ', userCredentials.user.email);
        } catch (error) {
            alert(error.message)
        }
    };

    const handleLogin = async () => {
        try {
            userCredentials = await auth.signInWithEmailAndPassword(email, password);
            console.log('Signed in with: ', userCredentials.user.email);
          } catch (error) {
            Alert.alert("Hi there!", "\nIt appears that either your login information is incorrect or you don't have an account. \n\nIf you don't have an account, please input an email and password and then click \'Register\'!");
          }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <ImageBackground style={ styles.imgBackground } 
                 resizeMode='cover' 
                 source={require('../images/wooden_background.png')}>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                /> 
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={ handleLogin }
                    style={styles.buttonLogInOut}
                >
                    <Text style={styles.buttonLoginText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={ handleSignUp }
                    style={[styles.buttonLogInOut, styles.buttonLogOut]}
                >
                    <Text style={styles.buttonPasswordText}>Register</Text>
                </TouchableOpacity>
            </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '70%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10, 
        marginTop: 5,
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    buttonLogInOut: {
        backgroundColor: '#0782F9',
        width: '50%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonLogOut: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 1,
    },
    buttonLoginText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonPasswordText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
    imgBackground: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});