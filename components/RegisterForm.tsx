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

export default () => {
  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);
  const [state, setState] = useState({});
  const {register} = useAPIContext();

  return (
    <View style={styles.form}>
      <Text style={styles.welcomeText}>Register</Text>
      <Text style={styles.welcomeText2}>Create New Account!</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="First Name *"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          onChange={e => setState({...state, first_name: e.nativeEvent.text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name *"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          onChange={e => setState({...state, last_name: e.nativeEvent.text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Email *"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          onChange={e => setState({...state, email: e.nativeEvent.text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number *"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          onChange={e => setState({...state, phone: e.nativeEvent.text})}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Passowrd *"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          secureTextEntry={showPass ? false : true}
          onChange={e => setState({...state, password: e.nativeEvent.text})}
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
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Passowrd *"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          secureTextEntry={showCPass ? false : true}
          onChange={e =>
            setState({...state, password_confirmation: e.nativeEvent.text})
          }
        />
        <Pressable
          onPress={() => {
            setShowCPass(!showCPass);
          }}
          style={styles.iconEye}>
          <Image
            source={
              showCPass
                ? require('../assets/login/eye1.png')
                : require('../assets/login/eye2.png')
            }
            style={styles.iconEye}
          />
        </Pressable>
      </View>
      <Pressable
        onPress={() => {
          register(state);
        }}
        style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Register</Text>
      </Pressable>
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
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
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
    textAlign: 'center',
  },
  welcomeText2: {
    fontSize: 20,
    color: '#ffffff77',
    marginBottom: 40,
    textAlign: 'center',
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
