import { Box, FlatList, useToast } from 'native-base';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { EmptyMyPoolList } from './EmptyMyPoolList';
import { GameProps, Game } from './Game';
import { Loading } from './Loading';

interface Props {
  poolId: string;
  code: string;
}

export function Guesses({ poolId, code }: Props) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState<GameProps[]>([]);
  const [firstTeamPoints, setFirstTeamPoints] = useState('');
  const [secondTeamPoints, setSecondTeamPoints] = useState('');

  async function handleGuessConfirm(gameId: string) {
    try {
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title: 'Preencha todos os campos',
          placement: 'top',
          bgColor: 'red.500',
        });
      }
      console.log(poolId, gameId);

      await api.post(`pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      });
      toast.show({
        title: 'Palpite enviado com sucesso',
        placement: 'top',
        bgColor: 'green.500',
      });

      fetchGames();
    } catch (error) {
      if (
        error.response?.data?.error ===
        'You cannot send guesses after the game date'
      ) {
        return toast.show({
          title: 'Você não pode enviar palpites após a data do jogo',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      toast.show({
        title: 'Não foi possivel enviar seu palpite',
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  }

  async function fetchGames() {
    try {
      setIsLoading(true);
      const response = await api.get(`pools/${poolId}/games`);
      setGames(response.data.games);
    } catch (error) {
      console.log(error);
      toast.show({
        title: 'Não foi possivel carregar os jogos',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGames();
  }, [poolId]);

  if (isLoading) return <Loading />;

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Game
          onGuessConfirm={() => handleGuessConfirm(item.id)}
          setSecondTeamPoints={setSecondTeamPoints}
          setFirstTeamPoints={setFirstTeamPoints}
          data={item}
        />
      )}
      _contentContainerStyle={{ pb: 10 }}
      ListEmptyComponent={() => <EmptyMyPoolList code={code} />}
    />
  );
}
