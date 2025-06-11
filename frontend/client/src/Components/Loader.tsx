import { Typography, Box, CircularProgress } from "@mui/material";

const Loader: React.FC = () => {
  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <CircularProgress />
      <Typography>Chargement...</Typography>
    </Box>
  );
};

export default Loader;
