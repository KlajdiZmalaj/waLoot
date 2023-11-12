import React from 'react';
import {
  ViroARScene,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroAmbientLight,
  ViroAnimations,
  ViroSpotLight,
  ViroMaterials,
} from '@viro-community/react-viro';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
//@ts-ignore
import coin from '../assets/coin.obj';
import {useGlobalContext} from '../contexts/Global';

ViroMaterials.createMaterials({
  coinMaterial: {
    lightingModel: 'PBR',
    diffuseTexture: require('../assets/textureFull.jpeg'),
    wrapS: 'Repeat',
    wrapT: 'Mirror',

    diffuseIntensity: 1000,
  },
});
export default () => {
  const navigation = useNavigation();
  //
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'grey',
      }}>
      <ViroARSceneNavigator
        initialScene={{
          scene: () => <ArView navigation={navigation} />,
        }}
        autofocus={true}></ViroARSceneNavigator>
    </View>
  );
};

const ArView = ({navigation}: any) => {
  const {collectCoin} = useGlobalContext();
  return (
    <ViroARScene style={{backgroundColor: 'black'}}>
      <ViroAmbientLight color={'#fff'} intensity={1000} />
      <ViroSpotLight
        innerAngle={5}
        outerAngle={90}
        direction={[0, -1, -0.2]}
        position={[-0.04, -2, -4.5]}
        color="#ffffff"
        castsShadow={true}
      />
      <Viro3DObject
        animation={{name: 'loopRotate', run: true, loop: true}}
        source={coin}
        materials={['coinMaterial']}
        highAccuracyEvents={true}
        position={[1, 1, -5]}
        scale={[0.5, 0.5, -0.5]}
        rotation={[-70, 60, 0]}
        type="OBJ"
        // transformBehaviors={['billboard']}
        onClick={async () => {
          //click handler for user when he collect the coin
          navigation.navigate('HomeScreen');
          // const data = await collectCoin();
          // if (data) {
          // }
        }}
      />
    </ViroARScene>
  );
};
ViroAnimations.registerAnimations({
  loopRotate: {
    properties: {
      rotateY: '+=45',
    },
    duration: 1100,
  },
});
