import { Box, Typography } from '@mui/material';

const Main = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url('/bg.svg')`,
        backgroundSize: 'cover',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Typography
        variant="h3"
        sx={(theme) => ({ color: theme.palette.primary.light })}
      >
        🀄️ Mahjong Time! 🀄️
      </Typography>
    </Box>
  );
};

export default Main;
