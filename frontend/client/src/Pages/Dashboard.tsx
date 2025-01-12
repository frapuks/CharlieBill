import { Typography, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // Utils
  const navigate = useNavigate();

  // Variables

  // UseEffect

  // Methods
  const handleProduct = () => {
    navigate("/products");
  };

  return (
    <Container sx={{ padding: 0 }}>
      <Typography variant="h5" textAlign={"center"}>
        Dashboard
      </Typography>
      <Button variant="contained" onClick={handleProduct}>
        Produits
      </Button>
    </Container>
  );
};

export default Dashboard;
