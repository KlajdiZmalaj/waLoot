export const LOGIN = () => ({
  url: 'api/login',
  method: 'POST',
});

export const REGISTER = () => ({
  url: 'api/register',
  method: 'POST',
});

export const LOGOUT = () => ({
  url: 'api/logout',
  method: 'POST',
});

//GETs
export const GET_COIN_DEST = () => ({
  url: 'java/coins/reverse',
  method: 'POST',
});

export const GET_SENSORS = () => ({
  url: 'api/sensors/audio',
  method: 'GET',
});

export const GET_PROFILE = () => ({
  url: 'api/profile',
  method: 'GET',
});

export const COLLECT_COIN = () => ({
  url: 'api/coins/collect',
  method: 'POST',
});

export const GET_COINS = () => ({
  url: 'java/coins/allCoins',
  method: 'GET',
});
