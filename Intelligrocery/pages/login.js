//React Native
import React, { useState, useEffect } from 'react'
import {View, Text, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Image, Alert} from 'react-native'
import { Dimensions } from 'react-native';

//Firebase
import { db, auth, handleSignOut } from '../firebase'
import { createUserWithEmailAndPassword,  signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc} from "firebase/firestore";

const windowWidth = Dimensions.get('window').width;

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect( () => {
        const unsubscribe = auth.onAuthStateChanged( user => {
            if (user) {
                navigation.replace("Tabs")
            }
        })
        return unsubscribe
    });

    const handleSignUp = async () => {
        try {
          userCredentials = await createUserWithEmailAndPassword(auth, email, password);
          console.log('Registered with: ', userCredentials.user.email);
          addUserFB();
        } catch (error) {
            alert(error.message)
        }
    };

    const handleLogin = async () => {
        try {
            userCredentials = await signInWithEmailAndPassword(auth, email, password);
            console.log('Signed in with: ', userCredentials.user.email);
          } catch (error) {
            Alert.alert("Hi there!", "\nIt appears that either your login information is incorrect or you don't have an account. \n\nIf you don't have an account, please input an email and password and then click \'Register\'!");
            return;
        }
    };

    const addUserFB = async () => {
        try {
            console.log("User id: ", auth.currentUser.uid, "\n");
            await setDoc(doc(db, "users", auth.currentUser.uid), {email: auth.currentUser.email});
        } catch (error) {
            console.log(error.message);
            user = auth.currentUser;
            try {
                handleSignOut({navigation});
            } catch (error) {
                console.log(error.message)
            }
            Alert.alert("It seems we had a problem adding you to our Intelligrocery database! Please try registering again!");
            try {
                await user.delete();
            } catch(error) {
                console.log(error.message);
            }
        }
    }


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <Image
                source={require('../images/IntelliGrocery.png')}
                style={{ width: windowWidth * 0.8, height: windowWidth * 0.15, marginBottom: 50 }} // Adjust percentages as needed
            />
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                    textContentType='oneTimeCode'
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                    textContentType='oneTimeCode'
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
        // marginTop: 40,
        marginTop: 50, // Adjusted marginTop to create space between the title and buttons
        marginBottom: 40, // Added marginBottom to create space between the title and buttons
    },
    buttonLogInOut: {
        backgroundColor: 'tomato',
        width: '50%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonLogOut: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: 'tomato',
        borderWidth: 1,
    },
    buttonLoginText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonPasswordText: {
        color: 'tomato',
        fontWeight: '700',
        fontSize: 16,
    },
    imgBackground: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        marginBottom: 50,
        alignItems: 'center', // Center title horizontally
    },
    title: {
        color: 'tomato',
        fontSize: 50,
        fontWeight: 'semibold',
    },
});
