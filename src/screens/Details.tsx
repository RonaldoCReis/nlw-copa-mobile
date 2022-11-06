import { useFocusEffect, useRoute } from '@react-navigation/native';
import { HStack, useToast, VStack } from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import { Share } from 'react-native';
import { EmptyMyPoolList } from '../components/EmptyMyPoolList';
import { Guesses } from '../components/Guesses';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { Option } from '../components/Option';
import { PoolCardProps } from '../components/PoolCard';
import { PoolHeader } from '../components/PoolHeader';
import { api } from '../services/api';

export const Details = () => {
  interface RouteParams {
    id: string;
  }
  const [optionSelected, setOptionSelected] = useState<
    'Seus palpites' | 'Ranking do grupo'
  >('Seus palpites');
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [poolDetails, setPoolDetails] = useState<PoolCardProps>(
    {} as PoolCardProps
  );
  const { id } = route.params as RouteParams;
  const toast = useToast();
  async function fetchPoolDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`pools/${id}`);
      setPoolDetails(response.data.pool);
    } catch (error) {
      console.log(error);
      toast.show({
        title: 'Não foi possivel carregar os detalhes do bolão',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCodeShare() {
    await Share.share({
      message: poolDetails.code,
    });
  }

  useEffect(() => {
    fetchPoolDetails();
  }, [id]);
  if (isLoading) return <Loading />;

  return (
    <VStack flex={1} bg="gray.900">
      <Header
        title={poolDetails.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />
      {poolDetails._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PoolHeader data={poolDetails} />
          <HStack bg="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Seus palpites"
              onPress={() => setOptionSelected('Seus palpites')}
              isSelected={optionSelected === 'Seus palpites'}
            />
            <Option
              title="Ranking do grupo"
              isSelected={optionSelected === 'Ranking do grupo'}
              onPress={() => setOptionSelected('Ranking do grupo')}
            />
          </HStack>
          <Guesses code={poolDetails.code} poolId={poolDetails.id} />
        </VStack>
      ) : (
        <EmptyMyPoolList code={poolDetails.code} />
      )}
    </VStack>
  );
};
