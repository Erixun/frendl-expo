import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { Marker } from 'react-native-maps';
import { AppColors } from '../theme/colors';
import { ZoneMember, ZoneStore } from '../store/zoneStore';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

type ZoneMarkerProps = {
  member: ZoneMember;
  zone: ZoneStore;
};

export const ZoneMarker = observer(({ member, zone }: ZoneMarkerProps) => {
  const [hasInfoWindowOpen, setHasInfoWindowOpen] = useState(false);
  const toggleInfoWindow = () => {
    setHasInfoWindowOpen(!hasInfoWindowOpen);
  };
  const message = zone.getLastMessage(member);
  useEffect(() => {
    if (!hasInfoWindowOpen && message) {
      setTimeout(() => {
        setHasInfoWindowOpen(true);
      }, 300);
    }
  }, [message]);

  return (
    <Marker
      key={member.userId}
      coordinate={{
        latitude: member.location.latitude,
        longitude: member.location.longitude,
      }}
      style={{ maxWidth: 200 }}
      onPress={toggleInfoWindow}
    >
      <View
        style={{
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        {hasInfoWindowOpen && (
          <>
            <View
              style={{
                backgroundColor: member.userColor,
                padding: 10,
                alignItems: 'center',
                borderRadius: 10,
                borderWidth: 1,
              }}
            >
              <Text style={{ fontWeight: 'bold' }}>{member.username}</Text>
              {message && (
                <Text style={{ textAlign: 'center' }}>{message}</Text>
              )}
            </View>
            <View
              style={{
                marginTop: -5,
                marginBottom: 3,
                width: 10,
                aspectRatio: 1,
                backgroundColor: member.userColor,
                transform: [{ rotate: '45deg' }],
                borderBottomWidth: 1,
                borderEndWidth: 1,
              }}
            ></View>
          </>
        )}
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {member.emoji ? (
            <Text style={{ fontSize: 30, marginTop: -2 }}>{member.emoji}</Text>
          ) : (
            <Ionicons
              name={'person-circle-outline'}
              size={40}
              color={AppColors.success700}
              padding={0}
            />
          )}
        </View>
      </View>
    </Marker>
  );
});
