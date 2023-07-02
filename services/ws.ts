import { runInAction } from 'mobx';
import { MapStore, useMapStore } from '../store/mapStore';
import { ZoneChatLogEntry } from '../store/zoneStore';

const API_URL = 'https://frendl-api.azurewebsites.net/api'; //process.env.API_URL//import.meta.env.VITE_API_URL// || 'http://localhost:3000/api';
const ZONE_API_URL = `${API_URL}/zone`;

export const postToEnterZone = async (zoneCode: string) => {
  const map = useMapStore();
  if (!map.currentUser) throw new Error('No current user found');
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      zoneId: zoneCode,
      userId: map.currentUser.userId,
      location: map.myLocation,
    }),
  };
  const data = await fetch(`${API_URL}/add-zone-member`, options).then(
    handleResponse
  );

  runInAction(() => {
    map.currentUser = data.user;
    console.log('map.currentUser', map.currentUser);
  });

  const zone = await fetch(`${ZONE_API_URL}/${zoneCode}`).then(handleResponse);

  return zone;
};

export const postToCreateZone = () => {
  const map = useMapStore();
  return fetch(ZONE_API_URL, provideInitZoneOptions(map)).then(handleResponse);
};

export const postToUpdateLocation = () => {
  const map = useMapStore();
  if (!map.zone) throw new Error('No zone found');
  if (!map.currentUser) throw new Error('No current user found');
  const payload = {
    zoneId: map.zone?.zoneId,
    userId: map.currentUser?.userId,
    location: map.myLocation,
  };
  fetch(`${API_URL}/update-location`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      if (res.status === 200) {
        console.log('new location updated successfully');
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteZoneMember = async () => {
  const map = useMapStore();
  if (!map.zone) throw new Error('No zone found');
  if (!map.currentUser) throw new Error('No current user found');
  fetch(`${API_URL}/delete-zone-member`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      zoneId: map.zone?.zoneId,
      userId: map.currentUser.userId,
    }),
  })
    .then(handleResponse)
    .catch((err) => {
      console.log(err);
    });
};

export const postToExitZone = async (map: MapStore) => {
  return fetch(
    `${ZONE_API_URL}/${map.zoneId}/exit`,
    provideInitZoneOptions(map)
  )
    .then(handleResponse)
    .catch((err) => {
      console.log(err);
    });
};

export const postToUpdateChatLog = async (
  zoneId: string,
  entry: ZoneChatLogEntry
) => {
  fetch(`${API_URL}/update-chat-log`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      zoneId: zoneId,
      userId: entry.userId,
      entry: entry,
    }),
  })
    .then((res) => {
      if (res.status === 200) {
        console.log('new chat log entry posted successfully');
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const provideInitZoneOptions = (map: MapStore) => {
  return {
    method: 'POST',
    body: JSON.stringify({
      userId: map.currentUser?.userId,
      location: map.myLocation,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

const handleResponse = (response: Response) => {
  if (response.ok) return response.json();

  throw new Error(response.statusText);
};
