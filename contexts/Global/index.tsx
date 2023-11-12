'use client';
import React, {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
} from 'react';
import {useAPIContext} from '../API';

const GlobalContext = createContext<IGlobalContext>({
  getSensorData: () => {},
  sensorData: [],
  getProfileData: () => {},
  profileData: {},
  collectCoin: () => {},
});

const GlobalProvider = ({children}: PropsWithChildren) => {
  const {fetch, user} = useAPIContext();
  const [sensorData, setSensorData] = useState();
  const [profileData, setProfileData] = useState<any>({});
  const getSensorData = async () => {
    const data = await fetch('GET_SENSORS', {});
    setSensorData(data);
  };

  const getProfileData = async () => {
    const data2 = await fetch('GET_PROFILE', {user_id: user.id});
    const data = await fetch('GET_COINS', {user_id: user.id});
    setProfileData({...profileData, ...data, ...data2});
  };
  const collectCoin = async () => {
    const data = await fetch('COLLECT_COIN', {});
  };

  return (
    <GlobalContext.Provider
      value={{
        getSensorData,
        sensorData,
        getProfileData,
        collectCoin,
        profileData,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
interface IGlobalContext {
  getSensorData: Promise<void> | any;
  sensorData: any;
  getProfileData: Promise<void> | any;
  profileData: any;
  collectCoin: Promise<void> | any;
}
export default GlobalProvider;
export const useGlobalContext = () => useContext(GlobalContext);
