import React, {useEffect} from 'react';
import {createContext, PropsWithChildren, useContext, useState} from 'react';
import axios from 'axios';
import * as endpoints from './endpoints';
import {
  getFromStorage,
  getStoredToken,
  setInStorage,
  setStoredToken,
} from '../../utils';
import {ToastAndroid} from 'react-native';

const APIContext = createContext<APIContextType>({
  fetch: () => {},
  user: {},
  login: () => {},
  logout: () => {},
  register: () => {},
});

const APIProvider = ({children}: PropsWithChildren) => {
  const [user, setUser] = useState<any>(null);
  console.log('user', user);

  useEffect(() => {
    getFromStorage('user').then(userString => {
      setUser(JSON.parse(userString || '{}'));
    });
  }, []);

  const login = async (data: any, callBack: any) => {
    const dataRes = await fetch('LOGIN', {...data});

    if (dataRes?.token) {
      setUser(dataRes.user);
      await setStoredToken(dataRes?.token?.access_token || '');
      await setInStorage('user', dataRes?.user);
      callBack?.();
    }
  };
  const register = async (data: any) => {
    fetch('REGISTER', {...data}).then(async dataRes => {
      setUser(dataRes.user);
      await setStoredToken(dataRes?.token?.access_token || '');
      await setInStorage('user', dataRes?.user);
    });
  };

  const logout = async (callBack: any) => {
    //call logut and remove from storagex3
    fetch('LOGOUT', {}).then(() => {
      setInStorage('user', {});
      setUser({});
      callBack?.();
    });
  };

  const fetch = async (REQUEST_PATH: string, extraParams: any) => {
    //@ts-ignore
    const options = endpoints[REQUEST_PATH]?.(extraParams.subpath) as any;
    //subpath is added to fetch url after endpoint api/example/subath then is deleted from payload params
    delete extraParams?.subpath;

    if (options) {
      try {
        let token = await getStoredToken();
        console.log('fetch token', token);

        const response = await handler(
          {...options, ...(extraParams ? {data: extraParams} : {})},
          token,
        );
        // console.log("LOG ~ FETCH RESPONSE", REQUEST_PATH, " ", response);
        return response.data;
      } catch (err: any) {
        if (axios.isCancel(err)) {
          return;
        }
        console.error('Error : ', err);
        // ToastAndroid.showWithGravity(
        //   `${
        //     err?.response?.data || err?.response?.data?.message || err?.message
        //   }`,
        //   2000,
        //   ToastAndroid.BOTTOM,
        // );

        const {status, data} = err.response || {};

        if (!status) {
          throw `[${options.method} ${options.url}] ${err}`;
        }

        throw `[${options.method} ${options.url}] Error ${status}: ${data?.title}`;
      }
    } else {
      console.log('REQUEST_PATH doesnt exist in endpoints');
    }
  };
  return (
    <APIContext.Provider
      value={{
        fetch,
        user,
        login,
        logout,
        register,
      }}>
      {children}
    </APIContext.Provider>
  );
};

export {APIContext, endpoints};
export const useAPIContext = () => useContext(APIContext);
export default APIProvider;

const handler = (options: any, token: string) => {
  return axios.request({
    ...options,
    url: `${'http://ifeed.live/'}${options.url}`,
    headers: {
      ...(token ? {Authorization: `Bearer ${token}`} : {}),
    },
    [options.method.match(/POST|PATCH/g) ? 'data' : 'params']: options.data,
  });
};

//types
type APIContextType = {
  fetch: (REQUEST_PATH: string, extraParams?: any) => Promise<void> | any;
  user: any;
  login: Promise<void> | any;
  logout: Promise<void> | any;
  register: Promise<void> | any;
};
