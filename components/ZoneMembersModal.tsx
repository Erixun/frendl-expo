import { Ionicons } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";
import { Modal, TouchableOpacity, View, Pressable, Text } from "react-native";
import { useMapStore } from "../store/mapStore";
import { AppColors } from "../theme/colors";

export const ZoneMembersModal = observer(
  ({
    isVisible,
    onCloseModal,
  }: {
    isVisible: boolean;
    onCloseModal: () => void;
  }) => {
    const map = useMapStore();
    const { zone } = map;
    return (
      <Modal
        animationType="slide"
        visible={isVisible}
        transparent={true}
        style={{
          width: '100%',
        }}
        pointerEvents="box-none"
      >
        <TouchableOpacity
          style={{
            flex: 1,
          }}
          onPress={onCloseModal}
        />
        <View
          style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            overflow: 'hidden',
          }}
          pointerEvents="box-none"
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: AppColors.success700,
              padding: 10,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 18,
                color: 'white',
              }}
            >
              Zone Members
            </Text>
            <Pressable onPress={onCloseModal}>
              <Ionicons name={'close'} size={24} color={AppColors.neutral100} />
            </Pressable>
          </View>
          <View
            style={{
              paddingTop: 10,
              paddingBottom: 50,
              paddingHorizontal: 20,
              gap: 10,
            }}
          >
            {zone?.members.map((member) => (
              <View
                key={member.userId}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <Ionicons
                  name={'person-circle'}
                  size={30}
                  color={AppColors.success700}
                />
                <Text style={{ fontWeight: 'bold' }}>{member.username}</Text>
              </View>
            ))}
          </View>
        </View>
      </Modal>
    );
  }
);