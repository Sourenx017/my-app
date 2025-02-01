import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Content, Wrapper, Title } from '../components/layout';
import Button from '../components/controls/Button';
import Colors from '../constants/Colors';

const Welcome = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Home'); // Using replace instead of navigate to prevent going back
        }, 2000);

        return () => clearTimeout(timer); // Cleanup timeout
    }, []);

    return (
        <Wrapper backgroundColor={Colors.black}>
            <Content>
                <View style={styles.container}>
                    <View style={styles.backgroundContainer}>
                        <Image source={require('../assets/seiko.png')} style={styles.backgroundImage} />
                        <Text style={styles.welcomeText}>Welcome to the App!</Text>
                    </View>
                </View>
                <Title color={Colors.white} title="Welcome to Seiko App" />
            </Content>
        </Wrapper>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.darkGray, // Temporary background color
    },
    backgroundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        color: Colors.white,
        fontSize: 24,
        fontWeight: 'bold',
    },
    background: {
        marginBottom: 20,
        marginTop: 50,
        width: '100%',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '100%',
        height: '100%',
    }
});