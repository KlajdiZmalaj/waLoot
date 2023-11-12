import React, {useRef} from 'react';
import {Animated, Pressable, Text, View} from 'react-native';

const AnimatedButton = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [
      {
        scale: scaleValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1],
        }),
      },
    ],
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'lightblue' : 'blue',
            padding: 10,
            borderRadius: 5,
          },
          animatedStyle,
        ]}>
        <Text style={{color: 'white', fontSize: 20}}>Press Me</Text>
      </Pressable>
    </View>
  );
};

export default AnimatedButton;
