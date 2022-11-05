import { VStack, Icon, useToast, FlatList } from 'native-base';
import { Button } from '../components/Button';
import { Header } from '../components/Header';

import { Octicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { api } from '../services/api';
import { useCallback, useEffect, useState } from 'react';
import { Loading } from '../components/Loading';
import { PoolCard, PoolCardProps } from '../components/PoolCard';
import { ItemClick } from 'native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types';
import { EmptyPoolList } from '../components/EmptyPoolList';

const Pools = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { navigate } = useNavigation();
  const [pools, setPools] = useState<PoolCardProps[]>([]);
  useFocusEffect(
    useCallback(() => {
      fetchPools();
    }, [])
  );
  const toast = useToast();
  async function fetchPools() {
    try {
      setIsLoading(true);
      const response = await api.get('pools');
      setPools(response.data.pools);
    } catch (error) {
      console.log(error);
      toast.show({
        title: 'Não foi possivel carregar os bolões',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />
      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor="gray.600"
        pb={4}
        mb={4}
      >
        <Button
          leftIcon={
            <Icon as={Octicons} name="search" color="black" size="md" />
          }
          title="Buscar bolão por código"
          onPress={() => navigate('find')}
        />
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={pools}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PoolCard data={item} />}
          ListEmptyComponent={() => <EmptyPoolList />}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          px={5}
        />
      )}
    </VStack>
  );
};

export default Pools;
