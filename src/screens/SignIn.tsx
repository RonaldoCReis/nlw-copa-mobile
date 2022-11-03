import { Center, Text, Icon } from 'native-base';
import Logo from '../assets/logo.svg';
import { Button } from '../components/Button';
import { Fontisto } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';

const Signin = () => {
  const { signIn, user } = useAuth();

  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={212} height={40} />
      <Button
        type="SECONDARY"
        title="Entrar com Google"
        mt={12}
        leftIcon={
          <Icon as={Fontisto} name="google" color="white" size={'md'} />
        }
        onPress={signIn}
      />
      <Text color="white" textAlign="center" px={3} mt={4}>
        Não utilizamos nenhuma informação além do seu e-mail para criação de sua
        conta
      </Text>
    </Center>
  );
};

export default Signin;
