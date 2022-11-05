import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import New from '../screens/New';
import Pools from '../screens/Pools';
import { PlusCircle, SoccerBall } from 'phosphor-react-native';
import { useTheme } from 'native-base';
import { Platform } from 'react-native';
import Find from '../screens/Find';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const { colors, sizes } = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarHideOnKeyboard: true,

        tabBarStyle: {
          position: 'absolute',
          height: sizes[22],
          borderTopWidth: 0,
          backgroundColor: colors.gray[800],
        },
        tabBarItemStyle: {
          position: 'relative',
          top: Platform.OS === 'android' ? -10 : 0,
        },
      }}
    >
      <Screen
        options={{
          tabBarIcon: ({ color }) => (
            <PlusCircle color={color} size={sizes[6]} />
          ),
          tabBarLabel: 'Novo bolão',
        }}
        name="new"
        component={New}
      />
      <Screen
        options={{
          tabBarIcon: ({ color }) => (
            <SoccerBall color={color} size={sizes[6]} />
          ),
          tabBarLabel: 'Meus bolões',
        }}
        name="pools"
        component={Pools}
      />

      <Screen
        options={{ tabBarButton: () => null }}
        name="find"
        component={Find}
      />
    </Navigator>
  );
}
