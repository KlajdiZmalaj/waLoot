import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import {useAPIContext} from '../contexts/API';
import {useNavigation} from '@react-navigation/native';

export default () => {
  const [showPass, setShowPass] = useState(false);
  const [state, setState] = useState({});
  const {login} = useAPIContext();
  const navigation = useNavigation();

  return (
    <View style={styles.form}>
      <Text style={styles.welcomeText}>Welcome back</Text>
      <Text style={styles.welcomeText2}>Login to your account</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          onChange={e => setState({...state, email: e.nativeEvent.text})}
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
        />
        <Image
          source={require('../assets/login/pfIcon.png')}
          style={styles.icon}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          onChange={e => setState({...state, password: e.nativeEvent.text})}
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          secureTextEntry={showPass ? false : true}
        />
        <Image
          source={require('../assets/login/lockIcon.png')}
          style={styles.icon}
        />
        <Pressable
          onPress={() => {
            setShowPass(!showPass);
          }}
          style={styles.iconEye}>
          <Image
            source={
              showPass
                ? require('../assets/login/eye1.png')
                : require('../assets/login/eye2.png')
            }
            style={styles.iconEye}
          />
        </Pressable>
      </View>
      <Text style={styles.fortgotPass}>Forgot Password?</Text>
      <TouchableOpacity
        onPress={async () => {
          await login(state, () => {
            navigation.navigate('HomeScreen' as never);
          });
        }}
        style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: '100%',
  },
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ffffff22',
    width: '100%',
    height: 50,
    maxHeight: 500,
    borderRadius: 40,
    paddingRight: 40,
    paddingLeft: 40,
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
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
