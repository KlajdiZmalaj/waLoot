//@ts-nocheck
import React, {useEffect, useRef, useState} from 'react';
import {Text, Image, ScrollView, Pressable} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {ActivityIndicator} from 'react-native';

const GOOGLE_MAPS_APIKEY = 'AIzaSyDkarToDNE8R__028JbjMn6vZEK3Iu2EG0';

import {
  ControlsText,
  ControlsWrapper,
  GifWrapper,
  HeadingText,
  HomeWrapper,
  MapCollectingCoin,
  MapLoadingBox,
  MapWrapper,
  mainStyles,
  mapStyle,
} from '../styles';
import GetLocation from 'react-native-get-location';

import FastImage from 'react-native-fast-image';
import MapViewDirections from 'react-native-maps-directions';
import AwesomeButton from 'react-native-really-awesome-button';
import {formatTimeFromSeconds, getMapRegion, haversine} from '../utils';
import {useAPIContext} from '../contexts/API';
import {useNavigation} from '@react-navigation/native';

export default () => {
  const {fetch} = useAPIContext();
  const navigation = useNavigation();

  const [liveLocation, setLiveLocation] = useState<any>({});
  const [destination, setDestination] = useState({});
  const [secondsFromStart, setSeconds] = useState(0);
  const [hasStarted, setStart] = useState(false);
  const [isPause, setPause] = useState(false);
  const MapViewRef = useRef({});

  const currentLocation = {
    latitude: liveLocation?.latitude || 0,
    longitude: liveLocation?.longitude || 0,
  };

  useEffect(() => {
    if (MapViewRef?.current?.animateToRegion) {
      if (destination?.latitude) {
        //aniamte 2 cordinates
        MapViewRef.current.fitToCoordinates([currentLocation, destination], {
          edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
          animated: true,
        });
      } else {
        //animate only one
        MapViewRef.current.animateToRegion(
          getMapRegion(currentLocation, currentLocation),
          1000,
        );
      }
    }
  }, [destination, currentLocation.latitude, MapViewRef.current]);

  useEffect(() => {
    if (secondsFromStart >= 1 && !isPause) {
      setTimeout(() => {
        setSeconds(secondsFromStart + 1);
      }, 1000);
    }
  }, [secondsFromStart, isPause]);

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(position => {
        console.log('curr location got', position);
        const region = {
          latitude: position.latitude,
          longitude: position.longitude,
        };

        setLiveLocation(region);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
    // setInterval(() => {}, 1000);
  }, []);

  const calculateCoinDestination = async () => {
    const data = (await fetch('GET_COIN_DEST', currentLocation)) || [];
    if (data[0]) {
      const destinationObj = {
        ...(data[0]?.response || {}),
        latitude: Number(data[0]?.response?.lat),
        longitude: Number(data[0]?.response?.lon),
      };

      setStart(true);
      setSeconds(1);
      setDestination(destinationObj);

      console.log('ca ka data GET_COIN_DEST ', data);
    }
  };

  const distanceBetween = haversine(
    liveLocation?.latitude,
    liveLocation?.longitude,
    destination?.latitude,
    destination?.longitude,
  );
  const isCoinCollectable = distanceBetween <= 40;

  return (
    <HomeWrapper>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          flex: 1,
        }}>
        <Pressable
          onPress={() => {
            setDestination(currentLocation);

            // if (__DEV__) {
            //   setDestination(currentLocation);
            // }
          }}>
          <HeadingText>
            {isCoinCollectable
              ? 'You arrived at your destination.'
              : hasStarted
              ? `Destination:  ${destination?.address?.road}`
              : 'Collect coins to unlock a treasure trove of wellness, vitality, and inner strength.'}
          </HeadingText>
        </Pressable>

        <MapWrapper>
          {isCoinCollectable ? (
            <MapCollectingCoin>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  alignSelf: 'center',
                }}
                resizeMode="cover"
                source={require('../assets/successCoin.png')}></Image>
              <Text
                style={{
                  color: '#808080',
                  fontWeight: 900,
                  marginTop: 20,
                  textTransform: 'uppercase',
                }}>
                Open your camera and collect your Loot
              </Text>
              <AwesomeButton
                style={{marginTop: 20}}
                width={140}
                textSize={13}
                textColor="#222"
                backgroundColor="#53e19a"
                backgroundDarker="#247d4e"
                springRelease={true}
                borderRadius={10}
                progress
                onPress={async (next: any) => {
                  await next();
                  navigation.navigate('ARCamera');
                }}>
                OPEN AR Camera
              </AwesomeButton>
            </MapCollectingCoin>
          ) : currentLocation.latitude ? (
            <MapView
              ref={MapViewRef}
              provider={'google'}
              customMapStyle={mapStyle}
              style={mainStyles.map}
              initialRegion={getMapRegion(currentLocation, destination)}
              // region={getMapRegion(currentLocation, destination)}
              pitchEnabled={true}>
              {liveLocation && (
                <Marker
                  pinColor="pink"
                  title="My location"
                  coordinate={currentLocation}>
                  <GifWrapper>
                    <FastImage
                      style={{width: 50, height: 50}}
                      source={require('../assets/myMarker.gif')}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </GifWrapper>
                </Marker>
              )}
              {destination.latitude && (
                <Marker
                  pinColor="pink"
                  title="Collect coin here"
                  coordinate={destination}>
                  <GifWrapper>
                    <FastImage
                      style={{width: 50, height: 50}}
                      source={require('../assets/coinGif.gif')}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </GifWrapper>
                </Marker>
              )}
              {hasStarted && destination.latitude ? (
                <MapViewDirections
                  key={destination?.latitude}
                  origin={currentLocation}
                  destination={destination}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeColor="#62bd54"
                  strokeWidth={3}
                  mode="WALKING"
                />
              ) : null}
            </MapView>
          ) : (
            <MapLoadingBox>
              <ActivityIndicator size="small" color="#f3bc55" />
              <Text style={{color: '#fff', marginTop: 10}}>Loading Map...</Text>
            </MapLoadingBox>
          )}
        </MapWrapper>
        {!isCoinCollectable && (
          <ControlsWrapper hasStarted={hasStarted}>
            {!hasStarted && (
              <AwesomeButton
                disabled={currentLocation.latitude == 0}
                height={60}
                width={240}
                textSize={13}
                textColor="#222"
                progress
                backgroundColor="#f3bc55"
                backgroundDarker="#eb9630"
                springRelease={true}
                borderRadius={10}
                onPress={async (next: any) => {
                  /** await for something; then: **/
                  await calculateCoinDestination();
                  await next();
                }}>
                LOOT SOME COINS
              </AwesomeButton>
            )}
            {hasStarted && (
              <AwesomeButton
                width={140}
                textSize={13}
                textColor="#222"
                progress
                backgroundColor="#a2a2a2"
                backgroundDarker="#6f6f6f"
                springRelease={true}
                borderRadius={10}
                onPress={async (next: any) => {
                  await next();
                  setPause(!isPause);
                }}>
                {isPause ? 'Resume' : 'Pause'}
              </AwesomeButton>
            )}
            {hasStarted && (
              <AwesomeButton
                width={140}
                textSize={13}
                textColor="#222"
                progress
                backgroundColor="#e83b3b"
                backgroundDarker="#aa1a1a"
                springRelease={true}
                borderRadius={10}
                onPress={async (next: any) => {
                  /** await for something; then: **/
                  setSeconds(0);
                  setStart(false);
                  setDestination({});
                  setPause(false);
                  await next();
                }}>
                Stop
              </AwesomeButton>
            )}
            {hasStarted && (
              <ControlsText>
                Total time :{formatTimeFromSeconds(secondsFromStart)}s
              </ControlsText>
            )}
          </ControlsWrapper>
        )}
      </ScrollView>
    </HomeWrapper>
  );
};
