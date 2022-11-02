import { Center, Spinner } from 'native-base';

const Loading = () => {
  return (
    <Center flex={1} bg="gray.900">
      <Spinner size={40} color="yellow.500" />
    </Center>
  );
};

export default Loading;
