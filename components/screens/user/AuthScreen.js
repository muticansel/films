import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
    ScrollView,
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Button,
    Alert,
    ActivityIndicator
} from 'react-native';
import { useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth'

import Input from '../../UI/Input';
import Card from '../../UI/Card';
import Colors from '../../../constants/colors';
import * as authActions from '../../../store/actions/auth';
import PrivConstants from '../../../privConstants/constants';
import firebase from '../../../config/firebase'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

const AuthScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignup, setIsSignUp] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    });

    useEffect(() => {
        if (error) {
            Alert.alert("An Error occured", error, [{ text: 'Okay   ' }])
        }
    }, [error])

    const authHandler = async () => {
        let action;
        if (isSignup) {
            action =
                authActions.signUp(
                    formState.inputValues.email,
                    formState.inputValues.password
                )
        } else {
            action =
                authActions.logIn(
                    formState.inputValues.email,
                    formState.inputValues.password
                )
        }

        setError(null)
        setIsLoading(true);
        try {
            await dispatch(action);
            props.navigation.navigate('Film')
        } catch (err) {
            setError(err.message);
            setIsLoading(false)
        }
    }

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );

    const logInFb = async () => {
        try {
            await Facebook.initializeAsync(PrivConstants.fbAppId);
            setIsLoading(true);
            const {
                type,
                token,
                expires
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', 'email'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
                const firebaseCredential = firebase.auth.FacebookAuthProvider.credential(token);
                const facebookProfileData = await firebase.auth().signInWithCredential(firebaseCredential);
                const accessToken = await facebookProfileData.user.getIdToken()

                await dispatch(authActions.loginFB(accessToken, facebookProfileData.user.uid, expires));
                props.navigation.navigate('Film')
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    const logInGoogle = async () => {
        try {
            setIsLoading(true);

            const config = {
                androidClientId: PrivConstants.googleAndroidClientId,
                iosClientId: PrivConstants.googleIosClientId,
                scopes: ['profile', 'email']
            }

            const {
                type,
                idToken
            } = await Google.logInAsync(config);
            if (type === 'success') {
                console.log(idToken);
                // Get the user's name using Facebook's Graph API
                await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
                const firebaseCredential = firebase.auth.GoogleAuthProvider.credential(idToken);
                const googleProfileData = await firebase.auth().signInWithCredential(firebaseCredential)
                console.log("Ok3")
                //const googleAccessToken = await googleProfileData.user.getIdToken()

                console.log("GOOGLE\n\n");

                //await dispatch(authActions.loginFB(accessToken, facebookProfileData.user.uid, expires));
                props.navigation.navigate('Film')
            } else {
                console.log("An error is occured")
            }
        } catch ({ message }) {
            alert(`Google Login Error: ${message}`);
            setIsLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={50}
            style={styles.screen}
        >
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id="email"
                            label="E-Mail"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorText="Please enter a valid email address."
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <Input
                            id="password"
                            label="Password"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorText="Please enter a valid password."
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <View style={styles.buttonContainer}>
                            {
                                isLoading ?
                                    <ActivityIndicator size="small" color={Colors.primary} /> :
                                    <Button title={isSignup ? "Sign Up" : "Login"}
                                        color={Colors.primary}
                                        onPress={authHandler} />
                            }
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                                color={Colors.accent}
                                onPress={() => {
                                    setIsSignUp(prevState => !prevState)
                                }}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Connect with FB"
                                color={Colors.facebookBlue}
                                onPress={logInFb}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Connect with Google"
                                color={Colors.googleRed}
                                onPress={logInGoogle}
                            />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

AuthScreen.navigationOptions = {
    headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    buttonContainer: {
        marginTop: 10
    }
});

export default AuthScreen;