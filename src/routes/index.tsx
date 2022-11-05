import { NavigationContainer } from '@react-navigation/native';
import Signin from '../screens/SignIn';

import { useAuth } from '../hooks/useAuth';

import { AppRoutes } from './app.routes';
import { Box } from 'native-base';

export function Routes() {
  const { user } = useAuth();
  return (
    <Box flex={1} bg="gray.900">
      <NavigationContainer>
        {user.name ? <AppRoutes /> : <Signin />}
      </NavigationContainer>
    </Box>
  );
}
