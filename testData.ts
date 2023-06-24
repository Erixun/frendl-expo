// import { CURRENT_USER_COLOR } from './constant/colors';
import { ZoneLocation } from './store/zoneStore';
import { CURRENT_USER_COLOR } from './theme/colors';

const Stockholm = {
  latitude: 59.3293,
  longitude: 18.0686,
};

const currentUser = {
  userId: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
  username: 'Erik Emanuel',
  userColor: CURRENT_USER_COLOR,
  status: 'online',
  message: '',
  location: Stockholm,
};

const members = [
  currentUser,
  {
    userId: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bef',
    username: 'Melvin Moore',
    status: 'offline',
    statusMessage: '',
    location: {
      latitude: 59.36,
      longitude: 18.05,
    },
  },
  {
    userId: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bee',
    username: 'Malva Melin',
    status: 'online',
    statusMessage: '',
    location: {
      latitude: 59.365,
      longitude: 18.07,
    },
  },
];

//Write a function to return a random location within a given radius of a given location
//https://stackoverflow.com/questions/5837572/generate-a-random-point-within-a-circle-uniformly
//https://stackoverflow.com/questions/1253499/simple-calculations-for-working-with-latitude-lon-and-km-distance
const getRandomLocation = (center: ZoneLocation, radius: number) => {
  const y0 = center.latitude;
  const x0 = center.longitude;
  const rd = radius / 111300; //about 111300 meters in one degree

  const u = Math.random();
  const v = Math.random();

  const w = rd * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  const xp = x / Math.cos(y0);

  return {
    latitude: y + y0,
    longitude: xp + x0,
  };
};

export { currentUser, members };
