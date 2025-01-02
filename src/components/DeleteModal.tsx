import { Box, Button, Modal, Typography } from '@mui/material';
import { Player, Score } from '@shared/types';

interface DeleteModalProps {
  scoreData: Player[];
  round: number;
  open: boolean;
  onClose: () => void;
  setScoreData: (value: Player[]) => void;
  setRounds: (value: number[]) => void;
}

const DeleteModal = ({
  scoreData,
  round,
  open,
  onClose,
  setScoreData,
  setRounds,
}: DeleteModalProps) => {
  const handleDeleteRound = () => {
    const newScoreData = scoreData.map((player) => {
      const newRounds = [...player.scores];
      newRounds.splice(round, 1);

      let totalScore;
      if (player.scores[round].type === 'win') {
        totalScore = player.totalScore - player.scores[round].value;
      } else {
        totalScore = player.totalScore + player.scores[round].value;
      }
      return { ...player, totalScore, scores: newRounds };
    });
    const playerScore = newScoreData.find((player: Player) => player.scores);
    const rounds =
      playerScore?.scores.map((_score: Score, index: number) => index) || [];
    setRounds(rounds);
    setScoreData(newScoreData);

    localStorage.setItem('scoreData', JSON.stringify(newScoreData));
    onClose();
  };

  return (
    <Modal onClose={onClose} open={open}>
      <Box
        sx={(theme) => ({
          backgroundColor: theme.palette.background.default,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '95%',
          padding: '30px',
          height: '80%',
          border: '2px solid #736BCE80',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 10,
        })}
      >
        <Box>
          <Typography
            variant="body1"
            sx={{ textAlign: 'center', margin: '30px 0' }}
            color="textPrimary"
          >
            Are you sure you want to delete the score from this round?
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: 'center', margin: '30px 0' }}
            color="textPrimary"
          >
            This can&apos;t be undone
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Button
            variant="outlined"
            sx={{ width: '100%', p: '30px' }}
            onClick={onClose}
          >
            <Typography variant="body1">cancel</Typography>
          </Button>
          <Button
            variant="contained"
            color="warning"
            sx={{ width: '100%', p: '30px' }}
            onClick={handleDeleteRound}
          >
            <Typography variant="body1">Delete Round</Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
