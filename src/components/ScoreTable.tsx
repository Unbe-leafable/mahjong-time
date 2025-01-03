import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import PlayerTile from '@components/PlayerTile';
import { getScoreColor } from '@utils/scoreUtils';
import { Player } from '@shared/types';
import { DeleteForever } from '@mui/icons-material';
import { useState } from 'react';
import DeleteModal from './DeleteModal';

interface ScoreTableProps {
  handleOpenScoreModal: (name: string) => void;
  rounds: number[];
  setRounds: (value: number[]) => void;
  namesList: string[];
  scoreData: Player[];
  setScoreData: (value: Player[]) => void;
}

const ScoreTable = ({
  handleOpenScoreModal,
  rounds,
  setRounds,
  namesList,
  scoreData,
  setScoreData,
}: ScoreTableProps) => {
  const [openDeleteModal, setOpenDeleteModal] = useState<number | null>(null);
  const handleOpenDeleteModal = (round: number) => {
    setOpenDeleteModal(round);
  };

  return (
    <TableContainer sx={{ maxHeight: 'calc(100vh - 82.5px)' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {namesList.map((name, index) => {
              const player = scoreData[index];
              if (!player) return null;

              return (
                <TableCell key={name}>
                  <PlayerTile
                    name={name}
                    score={player.totalScore}
                    onClick={() => handleOpenScoreModal(player.name)}
                  />
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rounds?.map((round) => {
            return (
              <TableRow key={round} sx={{ position: 'relative' }}>
                {namesList.map((name, index) => {
                  const lastIndex = namesList.length - 1;
                  const player = scoreData[index];
                  if (!player) return null;
                  return (
                    <TableCell key={name}>
                      <Typography
                        variant="h5"
                        color={getScoreColor(player.scores[round]?.type)}
                      >
                        {player.scores[round]?.value || '-'}
                      </Typography>
                      {index === lastIndex && (
                        <>
                          <IconButton
                            className="icon-button"
                            sx={{
                              position: 'absolute',
                              right: '12px',
                              top: '10px',
                            }}
                            onClick={() => handleOpenDeleteModal(round)}
                          >
                            <DeleteForever
                              sx={(theme) => ({
                                color: theme.palette.primary.light,
                              })}
                            />
                          </IconButton>
                          <DeleteModal
                            open={openDeleteModal === round}
                            onClose={() => setOpenDeleteModal(null)}
                            round={round}
                            setRounds={setRounds}
                            scoreData={scoreData}
                            setScoreData={setScoreData}
                          />
                        </>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScoreTable;
