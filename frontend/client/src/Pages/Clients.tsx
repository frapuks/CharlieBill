import { AddCircleOutline, KeyboardArrowRight } from "@mui/icons-material";
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
  Stack,
  Drawer,
  Box,
  Divider,
  TextField,
  Button,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Client } from "../Types";

const Clients = () => {
  // Utils
  const navigate = useNavigate();
  const theme = useTheme();
  const urlApi: string = import.meta.env.VITE_API_ROOT;

  // Variables
  const [clients, setClients] = useState<Client[]>([]);
  const [openAdd, setOpenAdd] = useState(false);

  // UseEffect
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${urlApi}/clients`);
      const data = await response.json();
      setClients(data);
    };
    fetchData();
  }, []);

  // Methods
  const handleClient = (id: number) => {
    navigate(`/clients/${id}`);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form: FormData = new FormData(event.currentTarget);

    const newClient = {
      id: Date.now(),
      name: form.get("name") as string,
      address: form.get("address") as string,
    };

    setClients([...clients, newClient]);
    setOpenAdd(false);
  };

  return (
    <Container sx={{ padding: 0 }}>
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/home">
          Accueil
        </Link>
        <Typography sx={{ color: "text.primary" }}>Clients</Typography>
      </Breadcrumbs>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Typography variant="h3">Liste des clients</Typography>
        <IconButton color="primary" onClick={() => setOpenAdd(true)}>
          <AddCircleOutline />
        </IconButton>
      </Stack>
      <Drawer open={openAdd} onClose={() => setOpenAdd(false)} anchor="right">
        <Box
          component="form"
          onSubmit={handleSubmit}
          onReset={() => setOpenAdd(false)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            margin: "2em 2em",
          }}
        >
          <Typography variant="h5" textAlign="center">
            Ajouter un client
          </Typography>
          <Divider />

          <TextField label="Nom" name="name" required />
          <TextField label="Adresse" name="address" required />

          <Stack direction="row" gap={2}>
            <Button variant="outlined" color="secondary" type="reset">
              Annuler
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Ajouter
            </Button>
          </Stack>
        </Box>
      </Drawer>
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
