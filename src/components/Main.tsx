import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import ScoreTable from '@components/ScoreTable';
import ScoreModal from '@components/ScoreModal';
import EditPlayerModal from '@components/EditPlayerModal';
import { scores, defaultScoreBoard, defaultNamesList } from '@shared/constants';
import { Score, ScoreType, WinType } from '@shared/types';

const Main = () => {
  const [scoreData, setScoreData] = useState(defaultScoreBoard);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [rounds, setRounds] = useState<number[]>([]);
  const [showEditPlayerModal, setShowEditPlayerModal] = useState(false);
  const [namesList, setNamesList] = useState<string[]>(defaultNamesList);

  useEffect(() => {
    const savedNames = localStorage.getItem('playerNames');
    if (savedNames) {
      setNamesList(JSON.parse(savedNames));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('playerNames', JSON.stringify(namesList));
  }, [namesList]);

  const handleNameChange = (index: number, newName: string) => {
    setNamesList((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames[index] = newName;
      return updatedNames;
    });
  };

  const handleOpenScoreModal = (name: string) => {
    setShowScoreModal(true);
    setSelectedPlayer(name);
  };

  const winTypeMapping: { [key: string]: string } = {
    'Opponent loss': 'opponentLoss',
    'Self draw': 'selfDraw',
    'Cover all': 'coverAll',
  };

  const handleAddScore = (
    points: string,
    winType: WinType | null,
    winner: string | null,
    loser: string | null
  ) => {
    const selectedPoints = scores[parseInt(points)];
    if (winType) {
      const camelCaseWinType = winTypeMapping[
        winType
      ] as keyof typeof selectedPoints;

      const noScore: Score = { type: null, value: 0 };

      if (winType === WinType.SELF) {
        if (loser !== 'All Players') {
          const winScore: Score = {
            type: ScoreType.WIN,
            value: selectedPoints[camelCaseWinType] * 3,
          };

          const loseScore: Score = {
            type: ScoreType.LOSE,
            value: selectedPoints[camelCaseWinType] * 3,
          };

          scoreData.forEach((player) => {
            if (player.name === winner) {
              player.totalScore += winScore.value;
              player.scores.push(winScore);
            } else if (player.name === loser) {
              player.totalScore -= loseScore.value;
              player.scores.push(loseScore);
            } else {
              player.scores.push(noScore);
            }
          });
        } else {
          const winScore: Score = {
            type: ScoreType.WIN,
            value: selectedPoints[camelCaseWinType] * 3,
          };

          const loseScore: Score = {
            type: ScoreType.LOSE,
            value: selectedPoints[camelCaseWinType],
          };

          scoreData.forEach((player) => {
            if (player.name === winner) {
              player.totalScore += winScore.value;
              player.scores.push(winScore);
            } else {
              player.totalScore -= loseScore.value;
              player.scores.push(loseScore);
            }
          });
        }
      }

      if (winType === WinType.OPPONENT) {
        const winScore: Score = {
          type: ScoreType.WIN,
          value: selectedPoints[camelCaseWinType],
        };

        const loseScore: Score = {
          type: ScoreType.LOSE,
          value: selectedPoints[camelCaseWinType],
        };

        scoreData.forEach((player) => {
          if (player.name === winner) {
            player.totalScore += winScore.value;
            player.scores.push(winScore);
          } else if (player.name === loser) {
            player.totalScore -= loseScore.value;
            player.scores.push(loseScore);
          } else {
            player.scores.push(noScore);
          }
        });
      }

      setScoreData([...scoreData]);
    }

    setShowScoreModal(false);
    setRounds([...rounds, rounds.length]);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url('/bg.svg')`,
        backgroundSize: 'cover',
        width: '100vw',
        height: '100vh',
      }}
    >
      {showEditPlayerModal && (
        <EditPlayerModal
          open={showEditPlayerModal}
          setShowEditPlayerModal={setShowEditPlayerModal}
          namesList={namesList}
          handleNameChange={handleNameChange}
        />
      )}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <Button color="primary" variant="contained">
          End Game
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setShowEditPlayerModal(true)}
        >
          Edit names
        </Button>
      </Box>

      {selectedPlayer && (
        <ScoreModal
          open={showScoreModal}
          name={selectedPlayer}
          namesList={namesList.filter((name) => name !== selectedPlayer)}
          setShowScoreModal={setShowScoreModal}
          handleAddScore={handleAddScore}
        />
      )}
      <ScoreTable
        handleOpenScoreModal={handleOpenScoreModal}
        rounds={rounds}
        namesList={namesList}
        scoreData={scoreData}
      />
    </Box>
  );
};

export default Main;
