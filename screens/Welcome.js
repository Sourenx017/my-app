import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar } from 'react-native';
import { Content } from '../components/layout';
import Button from '../components/controls/Button';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

const Welcome = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image 
                        source={require('../assets/seiko.png')} 
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.welcomeText}>Welcome to Seiko Store</Text>
                </View>
                
                <Text style={styles.subtitle}>Luxury Watches Collection</Text>

                <View style={styles.buttonContainer}>
                    <Button 
                        type="primary"
                        label="Create Account"
                        onPress={() => navigation.navigate('SignUp')}
                        style={styles.button}
                    />
                    <Text style={styles.orText}>Already have an account?</Text>
                    <Button 
                        type="secondary"
                        label="Login"
                        onPress={() => navigation.navigate('Login')}
                        style={styles.button}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.black,
        paddingTop: StatusBar.currentHeight,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 60,
    },
    logo: {
        width: 200,
        height: 100,
        marginBottom: 20,
    },
    welcomeText: {
        color: Colors.white,
        fontSize: 28,
        fontFamily: Fonts.family.bold,
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        color: Colors.lightGray,
        fontSize: 18,
        fontFamily: Fonts.family.regular,
        textAlign: 'center',
        marginVertical: 20,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 'auto',
        paddingBottom: 20,
    },
    button: {
        marginVertical: 8,
    },
    orText: {
        color: Colors.white,
        textAlign: 'center',
        marginVertical: 8,
        fontSize: 16,
        fontFamily: Fonts.family.regular,
    },
});

export default Welcome;