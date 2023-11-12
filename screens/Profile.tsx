import React, {useEffect, useState} from 'react';
import {LineChart, ProgressChart} from 'react-native-chart-kit';
import {AboutWrapper, ChartWrapper} from '../styles';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import {useGlobalContext} from '../contexts/Global';
import AwesomeButton from 'react-native-really-awesome-button';
import {useNavigation} from '@react-navigation/native';
import {useAPIContext} from '../contexts/API';
import {
  accelerometer,
  gyroscope,
  magnetometer,
  barometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import {useFocusEffect} from '@react-navigation/native';

setUpdateIntervalForType(SensorTypes.accelerometer, 1000);
setUpdateIntervalForType(SensorTypes.gyroscope, 1000);
setUpdateIntervalForType(SensorTypes.magnetometer, 1000);
setUpdateIntervalForType(SensorTypes.barometer, 1000);

const today = new Date();
const daysOfWeek = [
  {name: 'Thu', day: 9},
  {name: 'Fri', day: 10},
  {name: 'Sat', day: 11},
  {name: 'Sun', day: 12},
  {name: 'Mon', day: 13},
  {name: 'Tue', day: 14},
  {name: 'Wed', day: 15},
];

const getDayOfWeek = (offset: any) => {
  const day = new Date();
  day.setDate(today.getDate() + offset);
  return daysOfWeek[day.getDay()].name;
};
const getDayOfWeek2 = (offset: any) => {
  const day = new Date();
  day.setDate(today.getDate() + offset);
  return daysOfWeek[day.getDay()].day;
};
export default () => {
  const {getProfileData, profileData} = useGlobalContext();
  const navigation = useNavigation();
  const {user, logout} = useAPIContext();
  useEffect(() => {
    getProfileData();
  }, []);

  console.log('profileData', profileData);

  return (
    <View style={styles.container}>
      <ScrollView>
        <LinearGradient
          colors={['#e1c863', '#e1c863', '#d88b43']}
          style={styles.header}>
          <View style={styles.topHeaderGradient}>
            <Image
              source={require('../assets/pf.jpg')}
              style={styles.profileImage}
            />
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={{color: '#fff', marginRight: 5}}>
                {profileData?.coins?.length}
              </Text>
              <Image
                style={{width: 20, height: 20}}
                source={require('../assets/coinPng.png')}
              />
            </View>
          </View>
          <Text style={styles.date}>{today.toDateString()}</Text>
          <Text style={styles.name}>
            Hello {user?.first_name} {user?.last_name}
          </Text>
        </LinearGradient>
        <View
          style={[
            styles.dateContainer,
            {
              marginTop: 10,
            },
          ]}>
          {[...Array(7).keys()].map(offset => (
            <View
              key={offset}
              style={[styles.dayContainer, offset === 3 ? styles.today : null]}>
              <Text style={styles.dayText}>{getDayOfWeek(offset)}</Text>
            </View>
          ))}
        </View>
        <View style={styles.dateContainer}>
          {[...Array(7).keys()].map(offset => (
            <View key={offset} style={styles.dayContainer}>
              <Text style={styles.dayText}>{getDayOfWeek2(offset)}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.summary}>Your datas collected by sensors</Text>
        <View style={styles.summary}>
          <View style={[styles.summaryBox, {backgroundColor: '#3461bc'}]}>
            <View style={styles.summaryBox1}>
              <Text style={styles.boxText}>STEPS</Text>
              <Image
                source={require('../assets/steps.png')}
                style={styles.logo}
              />
            </View>
            <View style={styles.summaryBox2}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#fff',
                }}>
                {profileData?.steps}
              </Text>
            </View>
          </View>
          <View style={[styles.summaryBox, {backgroundColor: '#ff6d6e'}]}>
            <View style={styles.summaryBox1}>
              <Text style={styles.boxText}>HEART RATE</Text>
              <Image
                source={require('../assets/heart.png')}
                style={styles.logo}
              />
            </View>
            <View style={styles.summaryBox2}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#fff',
                }}>
                {profileData?.heard_rate?.last?.value || '-'} BPM
              </Text>
            </View>
          </View>
          <View style={[styles.summaryBox, {backgroundColor: '#5e64ee'}]}>
            <View style={styles.summaryBox1}>
              <Text style={styles.boxText}>SLEEP</Text>
              <Image
                source={require('../assets/sleep.png')}
                style={styles.logo}
              />
            </View>
            <View style={styles.summaryBox2}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#fff',
                }}>
                {profileData?.sleep}
              </Text>
            </View>
          </View>
          <View style={[styles.summaryBox, {backgroundColor: '#fca363'}]}>
            <View style={styles.summaryBox1}>
              <Text style={styles.boxText}>CALORIES</Text>
              <Image
                source={require('../assets/cal.png')}
                style={styles.logo}
              />
            </View>
            <View style={styles.summaryBox2}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#fff',
                }}>
                {profileData?.calories} kcal
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.chartsWrapper}>
          <Text style={{marginBottom: 20}}>Live Sensors Data</Text>

          <LiveSensorsData />

          <AwesomeButton
            style={{
              marginTop: 20,
              marginBottom: 10,
            }}
            onPress={() => {
              //logut
              logout(() => {
                navigation.navigate('Login' as never);
              });
            }}
            backgroundColor="#8b8b8b"
            backgroundDarker="#646464"
            width={Dimensions.get('screen').width - 20}>
            LOG OUT
          </AwesomeButton>
        </View>
      </ScrollView>
    </View>
  );
};
var sensorDatas: any = [];

const LiveSensorsData = () => {
  const [stateSensors, setStateSensors] = useState<any>([]);
  const [key, setKey] = useState(0);
  const accelerometerItems = [...stateSensors]
    .filter(item => item.type == 'accelerometer')
    .slice(-15);
  const gyroscopeItems = [...stateSensors]
    .filter(item => item.type == 'gyroscope')
    .slice(-15);

  useEffect(() => {
    setTimeout(() => {
      setStateSensors(sensorDatas);
      setKey(key + 1);
    }, 1000);
  }, [key]);

  useFocusEffect(
    React.useCallback(() => {
      //subscribe all on mount
      subScribeSensorDatas();
      return () => {
        sensorDatas = [];
        //un_subscribe all on unmount
        console.log(
          'subScribeSensorDatas()?.accelerometer?.unsubscribe',
          subScribeSensorDatas()?.accelerometer?.unsubscribe,
        );

        subScribeSensorDatas()?.accelerometer?.unsubscribe?.();
        subScribeSensorDatas()?.gyroscope?.unsubscribe?.();
        subScribeSensorDatas()?.magnetometer?.unsubscribe?.();
        subScribeSensorDatas()?.barometer?.unsubscribe?.();
      };
    }, []),
  );

  console.log('stateSensors accelerometerItems', accelerometerItems);

  return (
    <>
      <ChartWrapper style={styles.firstChart}>
        <LineChart
          data={{
            labels: [' ', ' ', ...accelerometerItems.map((item: any) => ``)],
            datasets: [
              {
                data: [
                  0,
                  0,
                  ...accelerometerItems.map((item: any) => item?.value),
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width - 20} // from react-native
          height={220}
          yAxisSuffix="km/h"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#d88b43',
            backgroundGradientTo: '#e1c863',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

            propsForDots: {
              r: '1',
              strokeWidth: '1',
              stroke: '#ffffff',
            },
          }}
          bezier
          style={{
            borderRadius: 10,
          }}
        />
      </ChartWrapper>
      <ChartWrapper>
        <LineChart
          data={{
            labels: [' ', ' ', ...gyroscopeItems.map((item: any) => ``)],
            datasets: [
              {
                data: [0, 0, ...gyroscopeItems.map((item: any) => item?.value)],
              },
            ],
          }}
          width={Dimensions.get('window').width - 20} // from react-native
          height={220}
          yAxisSuffix=" Y"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#d88b43',
            backgroundGradientTo: '#e1c863',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

            propsForDots: {
              r: '1',
              strokeWidth: '1',
              stroke: '#ffffff',
            },
          }}
          bezier
          style={{
            borderRadius: 10,
          }}
        />
      </ChartWrapper>
    </>
  );
};
const subScribeSensorDatas = () => {
  let unSubValues: any = {
    accelerometer: null,
    gyroscope: null,
    magnetometer: null,
    barometer: null,
  };
  unSubValues.accelerometer = accelerometer.subscribe(data => {
    sensorDatas.push({
      type: 'accelerometer',
      timestamp: new Date(data.timestamp).getSeconds(),
      value: data.y,
    });
  });
  unSubValues.gyroscope = gyroscope.subscribe(data => {
    sensorDatas.push({
      type: 'gyroscope',
      timestamp: new Date(data.timestamp).getSeconds(),
      value: data.y,
    });
  });
  unSubValues.magnetometer = magnetometer.subscribe(data => {
    sensorDatas.push({
      type: 'magnetometer',
      timestamp: new Date(data.timestamp).getSeconds(),
      value: data.y,
    });
  });

  unSubValues.barometer = barometer.subscribe(data => {
    sensorDatas.push({
      type: 'barometer',
      timestamp: new Date(data.timestamp).getSeconds(),
      value: data.pressure,
    });
  });
  return unSubValues;
};

const styles = StyleSheet.create({
  topHeaderGradient: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  firstChart: {
    marginBottom: 20,
  },
  chartsWrapper: {
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    height: 200,
    backgroundColor: '#d88b43',
    borderColor: 'black',
    alignItems: 'flex-start',
    paddingLeft: 50,
    paddingRight: 50,
    justifyContent: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    display: 'flex',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginBottom: 20,
  },
  date: {
    fontSize: 12,
    color: '#ffffffaa',
    lineHeight: 12,
  },
  name: {
    fontSize: 20,
    color: 'white',
    lineHeight: 20,
    marginTop: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dayContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  today: {
    backgroundColor: '#f2a154',
    borderRadius: 20,
    color: 'white',
  },
  dayText: {
    fontSize: 14,
    color: 'black',
  },
  summary: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 20,
  },
  summaryBox: {
    width: '46%',
    height: 150,
    marginBottom: 20,
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    padding: 20,
  },
  summaryBox1: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  summaryBox2: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  boxText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 3,
  },
});
