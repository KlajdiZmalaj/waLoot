//@ts-nocheck
import React from 'react';
import {Text, ScrollView, Image, Dimensions} from 'react-native';
import {HeadingText, HomeWrapper, StyledBtn} from '../styles';

const {width} = Dimensions.get('window');

export default ({navigation}) => {
  return (
    <HomeWrapper>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <HeadingText>
          Weelcome to{' '}
          <Text style={{fontWeight: 'bold', color: 'orange'}}>WaLoot!</Text>{' '}
          Let's turn your steps into reward and make every stride count. Walk to
          collect valuable coins and unlock exciting rewards along the journey.
        </HeadingText>
        <Image
          style={{
            width: width - 100,
            height: 400,
            alignSelf: 'center',
          }}
          resizeMode="cover"
          source={require('../assets/bankChar.png')}></Image>
        <StyledBtn
          onPress={() => {
            navigation.push('HomeMapScreen');
          }}>
          <Text style={{color: 'orange', textTransform: 'uppercase'}}>
            GET STARTED
          </Text>
        </StyledBtn>
      </ScrollView>
    </HomeWrapper>
  );
};
