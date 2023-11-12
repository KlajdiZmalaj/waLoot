import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const mainStyles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  whiteBg: {
    backgroundColor: '#fff',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export const mapStyle = [
  {
    featureType: 'all',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [
      {
        saturation: 36,
      },
      {
        color: '#000000',
      },
      {
        lightness: 40,
      },
    ],
  },
  {
    featureType: 'all',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#000000',
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: 'all',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 17,
      },
      {
        weight: 1.2,
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#e5c163',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#c4c4c4',
      },
    ],
  },
  {
    featureType: 'administrative.neighborhood',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#e5c163',
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 21,
      },
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'poi.business',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#e5c163',
      },
      {
        lightness: '0',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#e5c163',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 18,
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#575757',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#2c2c2c',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#999999',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 19,
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 17,
      },
    ],
  },
];
export const GifWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 10px;
`;

export const HomeWrapper = styled.View`
  flex: 1;
  padding: 10px;
`;
export const MapWrapper = styled.View`
  display: flex;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 10px;
  flex-grow: 1;
  margin-bottom: 20px;
`;
export const HeadingText = styled.Text`
  display: flex;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: 1px;
  color: #222;
`;
export const StyledBtn = styled.Pressable`
  display: flex;
  width: 50%;
  height: 50px;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid orange;
  text-transform: uppercase;
`;

export const ControlsWrapper = styled.View`
  display: flex;
  flex-flow: row wrap;
  padding: 20px 0;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  margin: auto;
  background-color: #ffffff;
  border: 1px solid #e19c1c;
  align-items: center;
  justify-content: space-evenly;
  align-content: center;
  padding-bottom: ${({hasStarted}: any) => (hasStarted ? '50px' : '20px')};
  align-self: flex-end;
  justify-self: flex-end;
  margin-top: auto;
  margin-bottom: 0;
`;
export const ControlsText = styled.Text`
  font-size: 14px;
  width: 100%;
  margin: auto;
  text-align: center;
  left: 0;
  background-color: #e1e1e1;
  padding: 10px 0;
  color: #595959;
  position: absolute;
  left: 0;
  bottom: 0;
`;

//ABOUT SECTION ~~~~~~~~~~~~~~~~~~~~~~~~~

export const AboutWrapper = styled.View`
  display: flex;
  width: 100%;
  flex: 1;
  padding: 10px;
  flex-flow: column;
  align-items: flex-start;
  color: #222;
`;
export const ChartWrapper = styled.View`
  display: flex;
  width: 100%;
`;
export const Header = styled.View`
  display: flex;
  color: 'red';
`;
export const MapLoadingBox = styled.View`
  width: 100%;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  align-content: center;
  background-color: #222;
  text-align: center;
  color: #fff;
  border-radius: 10px;
`;
export const MapCollectingCoin = styled.View`
  width: 100%;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  align-content: center;
  background-color: #fff;
  text-align: center;
  color: #fff;
  border-radius: 10px;
  border: 10px solid #acc7aa2a;
`;
