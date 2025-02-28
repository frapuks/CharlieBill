import { KeyboardArrowRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  TableContainer,
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  useTheme,
} from "@mui/material";
import { clients } from "../Utils/ClientList";

const Clients = () => {
  // Utils
  const navigate = useNavigate();
  const theme = useTheme();

  // Variables

  // UseEffect

  // Methods
  const handleClient = (id: number) => {
    navigate(`/clients/${id}`);
  };

  return (
    <Container sx={{ padding: 0 }}>
      <Typography variant="h5" textAlign={"center"}>
        Liste des clients
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: theme.palette.primary.light }}>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell align="center">Adresse (€)</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell align="center">{client.address}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => handleClient(client.id)}
                  >
                    <KeyboardArrowRight />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Clients;
