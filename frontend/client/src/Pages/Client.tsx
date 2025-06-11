import {
  Typography,
  Container,
  Button,
  Stack,
  Box,
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
  IconButton,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Params, useNavigate, useParams } from "react-router-dom";
import { clients } from "../Utils/ClientList";
import { useEffect, useState } from "react";
import { products } from "../Utils/ProductList";
import { prestations as prestationsList } from "../Utils/PrestationList";
import type { Client as ClientType } from "../Types";
import { AddCircleOutline, Delete, Edit } from "@mui/icons-material";
import { DeleteDialog, Loader } from "../Components";

const Client = () => {
  // Utils
  const theme = useTheme();
  const navigate = useNavigate();
  const { clientId } = useParams<Params>();

  // Variables
  const [client, setClient] = useState<ClientType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [openEdit, setOpenEdit] = useState(false);
  const [openDeleteClient, setOpenDeleteClient] = useState(false);
  const [openAddPrestation, setOpenAddPrestation] = useState(false);
  const [product, setProduct] = useState("");
  const [prestations, setPrestations] = useState(prestationsList);
  const [prestationIdToDelete, setPrestationIdToDelete] = useState(0);
  const [
    openDialogConfirmDeletePrestation,
    setOpenDialogConfirmDeletePrestation,
  ] = useState(false);

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
    return <Loader />;
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
    const price = product?.price || 0;
    const date = form.get("date") as string;

    const newPrestation = {
      id: Date.now(),
      clientId: parseInt(clientId as string),
      productId: productId,
      date: new Date(date).toISOString(),
      name: product?.name || "",
      quantity: quantity,
      unit_price: price,
      total: price * quantity,
    };

    setPrestations([...prestations, newPrestation]);
    setOpenAddPrestation(false);
  };

  const handleRemovePrestation = (id: number) => {
    setPrestationIdToDelete(id);
    setOpenDialogConfirmDeletePrestation(true);
  };

  const handleConfirmRemovePrestation = (id: number) => {
    const newList = prestations.filter((prestation) => prestation.id !== id);
    setPrestations(newList);
    setOpenDialogConfirmDeletePrestation(false);
  };

  const handleConfirmDeleteClient = () => {
    setOpenDeleteClient(false);
    navigate("/clients");
  };

  return (
    <Container sx={{ padding: 0 }}>
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/home">
          Accueil
        </Link>
        <Link underline="hover" color="inherit" href="/clients">
          Clients
        </Link>
        <Typography sx={{ color: "text.primary" }}>{client.name}</Typography>
      </Breadcrumbs>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Typography variant="h3">{client.name}</Typography>
        <IconButton color="primary" onClick={() => setOpenEdit(true)}>
          <Edit />
        </IconButton>
      </Stack>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <Typography>Nom : </Typography>
          <Typography>{client.name}</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography>Adresse : </Typography>
          <Typography>{client.address}</Typography>
        </Stack>
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
            margin: "2em 2em",
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
            <Button variant="outlined" color="secondary" type="reset">
              Annuler
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Sauvegarder
            </Button>
          </Stack>
          <Divider />
          <Button
            variant="contained"
            color="error"
            startIcon={<Delete />}
            size="small"
            onClick={() => setOpenDeleteClient(true)}
          >
            Supprimer le client
          </Button>
        </Box>
        <DeleteDialog
          open={openDeleteClient}
          handleClose={() => setOpenDeleteClient(false)}
          handleConfirm={handleConfirmDeleteClient}
        />
      </Drawer>

      <Divider sx={{ margin: 5 }} />

      <Stack direction="row" justifyContent="center" alignItems="center">
        <Typography variant="h4">Prestations</Typography>
        <IconButton color="primary" onClick={() => setOpenAddPrestation(true)}>
          <AddCircleOutline />
        </IconButton>
      </Stack>
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
            margin: "2em 2em",
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
              <TableCell>Produit</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Quantité</TableCell>
              <TableCell align="center">Prix Unitaire (€)</TableCell>
              <TableCell align="center">Total (€)</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prestations.map((prestation) => (
              <TableRow key={prestation.id}>
                <TableCell>{prestation.name}</TableCell>
                <TableCell align="center">
                  {new Date(prestation.date).toLocaleDateString("fr-FR")}
                </TableCell>
                <TableCell align="center">{prestation.quantity}</TableCell>
                <TableCell align="center">
                  {prestation.unit_price.toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  {prestation.total.toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => handleRemovePrestation(prestation.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteDialog
        open={openDialogConfirmDeletePrestation}
        handleClose={() => setOpenDialogConfirmDeletePrestation(false)}
        handleConfirm={() =>
          handleConfirmRemovePrestation(prestationIdToDelete)
        }
      />
    </Container>
  );
};

export default Client;
