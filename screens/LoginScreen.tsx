import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';

import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/loginForm';

const loginImg = require('../assets/loginBg.jpeg');
const registerImg = require('../assets/registerBg.png');

export default () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <FastImage
      source={!showRegister ? loginImg : registerImg}
      resizeMode={FastImage.resizeMode.cover}>
      <View style={styles.containerBig}>
        <View style={styles.container}>
          {showRegister ? <RegisterForm /> : <LoginForm />}
          <Pressable
            onPress={() => {
              setShowRegister(!showRegister);
            }}
            style={styles.registerStyles}>
            {showRegister ? (
              <Text style={styles.registerText}>Go to Login!</Text>
            ) : (
              <Text style={styles.registerText}>
                Don't have an account? Sign Up!
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </FastImage>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    width: '100%',
  },
  icon: {
    position: 'absolute',
    height: 20,
    width: 20,
    left: 12,
    top: 22,
  },
  iconEye: {
    position: 'absolute',
    height: 20,
    width: 20,
    right: 12,
    top: 12,
  },
  registerText: {
    color: '#ffffffee',
    marginTop: 10,
    marginRight: 5,
  },
  registerStyles: {
    display: 'flex',
    flexDirection: 'row',
  },
  backgroundImage: {
    flex: 1,
  },
  containerBig: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ffffff22',
    width: '100%',
    // height: 50,
    // maxHeight: 600,
    borderRadius: 40,
    paddingRight: 40,
    paddingLeft: 40,
    paddingTop: 50,
    paddingBottom: 50,
  },
  blurView: {
    position: 'absolute',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 40,
    color: 'white',
    fontFamily: 'Raleway-Regular',
  },
  welcomeText2: {
    fontSize: 20,
    color: '#ffffff77',
    marginBottom: 40,
  },
  fortgotPass: {
    color: '#ffffff77',
    width: '100%',
    textAlign: 'right',
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    borderRadius: 5,
    marginTop: 10,
    paddingLeft: 40,
    color: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ffffff22',
  },
  signInButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#fcca5d',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
