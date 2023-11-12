import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFromStorage = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    // saving error
  }
};
export const setInStorage = async (key: string, data: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    // saving error
  }
};

export const setStoredToken = async (value: string) => {
  try {
    await AsyncStorage.setItem('token', value);
  } catch (e) {
    // saving error
  }
};
export const getStoredToken = async (): Promise<string> => {
  try {
    const value = (await AsyncStorage.getItem('token')) as string;
    if (value !== null) {
      // value previously stored
    }
    return value;
  } catch (e) {
    // error reading value
    return '';
  }
};

export const clamp = (num: number, min: number, max: number) =>
  num > max ? max : num < min ? min : num;

export function debounce(func: any, delay: number) {
  let timeoutId: any;

  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func, delay);
  };
}
export const areEqual = (obj1: any, obj2: any) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export function formatTimestamp(timestamp: number | null): string | 0 {
  if (!timestamp) {
    return 0;
  }
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const formattedDate = `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}

export function formatTimeFromSeconds(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export const getMapRegion = (coordinate1: any, coordinate2: any) => {
  // Calculate the bounding box that includes both points
  const latitudeDelta =
    Math.abs(
      coordinate1.latitude - (coordinate2.latitude || coordinate1.latitude),
    ) * 2;
  const longitudeDelta =
    Math.abs(
      coordinate1.longitude - (coordinate2.longitude || coordinate1.longitude),
    ) * 2;

  const centerLatitude =
    (coordinate1.latitude + (coordinate2.latitude || coordinate1.latitude)) / 2;
  const centerLongitude =
    (coordinate1.longitude + (coordinate2.longitude || coordinate1.longitude)) /
    2;

  const region = {
    latitude: centerLatitude,
    longitude: centerLongitude,
    latitudeDelta: clamp(latitudeDelta, 0, latitudeDelta),
    longitudeDelta: clamp(longitudeDelta, 0.001, longitudeDelta),
  };
  return region;
};

export function haversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  // Convert latitude and longitude from degrees to radians
  const toRadians = (angle: number) => (angle * Math.PI) / 180;
  lat1 = toRadians(lat1);
  lon1 = toRadians(lon1);
  lat2 = toRadians(lat2);
  lon2 = toRadians(lon2);

  // Haversine formula
  const dlat = lat2 - lat1;
  const dlon = lon2 - lon1;

  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Radius of the Earth in kilometers (you can use 3956 for miles)
  const R = 6371.0;

  // Calculate the distance
  const distance = R * c;
  //diff in meters
  return distance * 1000;
}
