import { Typography, Container, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // Utils
  const navigate = useNavigate();

  // Variables

  // UseEffect

  // Methods
  const handleProducts = () => {
    navigate("/products");
  };

  const handleClients = () => {
    navigate("/clients");
  };

  return (
    <Container sx={{ padding: 0 }}>
      <Typography variant="h3" textAlign={"center"}>
        Accueil
      </Typography>
      <Stack direction='row' justifyContent='center' gap={5}>
        <Button variant="contained" onClick={handleProducts}>
          Produits
        </Button>
        <Button variant="contained" onClick={handleClients}>
          Clients
        </Button>
      </Stack>
    </Container>
  );
};

export default Dashboard;
