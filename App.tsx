import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from './screens/HomeScreen';
import Profile from './screens/Profile';
import GlobalProvider from './contexts/Global';
import LinearGradient from 'react-native-linear-gradient';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeMapScreen from './screens/HomeMapScreen';
import APIProvider, {useAPIContext} from './contexts/API';
import ARCamera from './screens/ARCamera';
import LoginScreen from './screens/LoginScreen';
import SplashScreen from 'react-native-splash-screen';
import {ActivityIndicator, View} from 'react-native';
import Bluetooth from './screens/Bluetooth';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <APIProvider>
      <GlobalProvider>
        <NavigationContainer>
          <TabsNavigator />
        </NavigationContainer>
      </GlobalProvider>
    </APIProvider>
  );
}

const TabsNavigator = () => {
  const {user} = useAPIContext();

  return user === null ? (
    <View>
      <ActivityIndicator size="small" color="#f3bc55" />
    </View>
  ) : (
    <Tab.Navigator
      initialRouteName={user?.id ? 'HomeScreen' : 'Login'}
      screenOptions={{
        headerBackground: () => (
          <LinearGradient
            colors={['#d88b43', '#e1c863']}
            style={{flex: 1}}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
          />
        ),

        headerShown: true,
        headerTintColor: 'black',
        headerTitleStyle: {
          // textAlign: 'center',
          fontWeight: '300',
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: () => null,
          tabBarActiveTintColor: 'orange',
          tabBarLabel: 'Huawei Health',
          headerTitle: 'Huawei Health',
          tabBarLabelStyle: {
            height: 30,
            fontWeight: 'bold',
            fontSize: 12,
          },
        }}
        name="HomeScreen"
        component={HomeStackNavigator}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => null,
          tabBarActiveTintColor: 'orange',
          tabBarLabelStyle: {
            height: 30,
            fontWeight: 'bold',
            fontSize: 12,
          },
        }}
        name="My Activity"
        component={Profile}
      />

      <Tab.Screen
        options={{
          tabBarStyle: {
            display: 'none',
          },
          tabBarLabel: 'ARCamera',
          tabBarIcon: () => null,
          tabBarActiveTintColor: 'orange',
          headerShown: false,
          tabBarButton: () => null,
          tabBarLabelStyle: {
            height: 30,
            fontWeight: 'bold',
            fontSize: 12,
          },
        }}
        name="ARCamera"
        component={ARCamera}
      />
      <Tab.Screen
        options={{
          tabBarStyle: {
            display: 'none',
          },
          headerShown: false,
          tabBarButton: () => null,
        }}
        name="Login"
        component={LoginScreen}
      />

      <Tab.Screen
        options={{
          tabBarLabel: 'Bluetooth',
          tabBarIcon: () => null,
          tabBarActiveTintColor: 'orange',
          tabBarLabelStyle: {
            height: 30,
            fontWeight: 'bold',
            fontSize: 12,
          },
        }}
        name="Bluetooth"
        component={Bluetooth}
        />
    </Tab.Navigator>
  );
};
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreenStack">
      <Stack.Screen
        name="HomeScreenStack"
        options={{
          headerShown: false,
        }}
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="HomeMapScreen"
        component={HomeMapScreen}
      />
    </Stack.Navigator>
  );
};
export default App;

{
  /* <View>
<Tab.Navigator>
  <Tab.Screen name="Home" component={HomeScreen} />
  <Tab.Screen name="Settings" component={About} />
</Tab.Navigator>
</View> */
}
