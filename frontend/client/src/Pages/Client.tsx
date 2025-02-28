import {
  Typography,
  Container,
  Button,
  Stack,
  Box,
  CircularProgress,
  Drawer,
  TextField,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Params, useParams } from "react-router-dom";
import { clients } from "../Utils/ClientList";
import { useEffect, useState } from "react";
import { products } from "../Utils/ProductList";
import { prestations as prestationsList } from "../Utils/PrestationList";
import type { Client } from "../Types";

const Client = () => {
  // Utils
  const theme = useTheme();
  const { clientId } = useParams<Params>();

  // Variables
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [openEdit, setOpenEdit] = useState(false);
  const [openAddPrestation, setOpenAddPrestation] = useState(false);
  const [product, setProduct] = useState("");
  const [prestations, setPrestations] = useState(prestationsList);

  // UseEffect
  useEffect(() => {
    setLoading(true);
    const currentClient = clients.find(
      (elem) => elem.id === parseInt(clientId ?? "")
    );
    if (!currentClient) {
      setError("Aucun client trouvé.");
    } else {
      setClient(currentClient);
    }
    setLoading(false);
    const clientPrestations = prestations.filter(
      (prestation) => prestation.clientId === currentClient?.id
    );
    setPrestations(clientPrestations);
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography>Chargement...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!client) {
    return <Typography>Aucun client trouvé.</Typography>;
  }

  // Methods
  const handleSubmitEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form: FormData = new FormData(event.currentTarget);
    const newClient = {
      id: client.id,
      name: form.get("name") as string,
      address: form.get("address") as string,
    };
    setClient(newClient);
    console.log("Client mis à jour :", newClient);
    setOpenEdit(false);
  };

  const handleChangeProduct = (event: SelectChangeEvent) => {
    setProduct(event.target.value as string);
  };

  const handleSubmitPrestation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form: FormData = new FormData(event.currentTarget);
    const productId = parseInt(form.get("productId") as string) || 0;
    const quantity = parseInt(form.get("quantity") as string) || 0;
    const product = products.find((product) => product.id === productId);

    const newPrestation = {
      id: Date.now(),
      clientId: clientId,
      productId: productId,
      date: form.get("date"),
      name: product?.name,
      quantity: quantity,
      unit_price: product?.price,
      total: product?.price * form.get("quantity"),
    };

    setPrestations([...prestations, newPrestation]);
    setOpenAddPrestation(false);
  };

  return (
    <Container sx={{ padding: 0 }}>
      <Typography variant="h5" textAlign={"center"}>
        {client.name}
      </Typography>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <Typography>Nom : </Typography>
          <Typography>{client.name}</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography>Adresse : </Typography>
          <Typography>{client.address}</Typography>
        </Stack>
        <Button
          variant="outlined"
          sx={{ alignSelf: "center" }}
          onClick={() => setOpenEdit(true)}
        >
          Modifier
        </Button>
      </Stack>
      <Drawer open={openEdit} onClose={() => setOpenEdit(false)} anchor="right">
        <Box
          component="form"
          onSubmit={handleSubmitEdit}
          onReset={() => setOpenEdit(false)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            margin: "2em 4em",
            width: 500,
          }}
        >
          <Typography variant="h5" textAlign="center">
            Modifier le Client
          </Typography>
          <Divider />
          <TextField
            label="Nom"
            name="name"
            defaultValue={client.name}
            required
          />
          <TextField
            label="Adresse"
            name="address"
            defaultValue={client.address}
            required
          />
          <Stack direction="row" gap={2}>
            <Button variant="contained" color="error" type="reset">
              Annuler
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Sauvegarder
            </Button>
          </Stack>
        </Box>
      </Drawer>

      <Divider sx={{ margin: 5 }} />

      <Typography variant="h5" textAlign={"center"}>
        Prestations
      </Typography>

      <Button
        variant="outlined"
        sx={{ alignSelf: "center" }}
        onClick={() => setOpenAddPrestation(true)}
      >
        Ajouter une prestation à ce client
      </Button>
      <Drawer
        open={openAddPrestation}
        onClose={() => setOpenAddPrestation(false)}
        anchor="right"
      >
        <Box
          component="form"
          onSubmit={handleSubmitPrestation}
          onReset={() => setOpenAddPrestation(false)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            margin: "2em 4em",
            width: 500,
          }}
        >
          <Typography variant="h5" textAlign="center">
            Ajouter une prestation
          </Typography>
          <Divider />

          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
            <DatePicker name="date" defaultValue={dayjs(Date.now())} />
          </LocalizationProvider>

          <FormControl fullWidth>
            <InputLabel id="select-product">Produit</InputLabel>
            <Select
              labelId="select-product"
              name="productId"
              value={product}
              label="Product"
              onChange={handleChangeProduct}
            >
              {products.map((product) => (
                <MenuItem value={product.id}>
                  {product.name} ({product.price.toFixed(2) + " €"})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Quantité"
            name="quantity"
            type="number"
            defaultValue={1}
            required
          />

          <Stack direction="row" gap={2}>
            <Button variant="contained" color="error" type="reset">
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
              <TableCell>Produit</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Quantité</TableCell>
              <TableCell>Prix Unitaire (€)</TableCell>
              <TableCell>Total (€)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prestations.map((prestation) => (
              <TableRow key={prestation.id}>
                <TableCell>{prestation.name}</TableCell>
                <TableCell>{prestation.date}</TableCell>
                <TableCell>{prestation.quantity}</TableCell>
                <TableCell>{prestation.unit_price.toFixed(2)}</TableCell>
                <TableCell>{prestation.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Client;
