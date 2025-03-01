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
  Button,
  TextField,
  Breadcrumbs,
  Link
} from "@mui/material";
import { products as productsList } from "../Utils/ProductList";
import { useState } from "react";

const Products = () => {
  // Utils
  const navigate = useNavigate();
  const theme = useTheme();

  // Variables
  const [products, setProducts] = useState(productsList);
  const [openAdd, setOpenAdd] = useState(false);

  // UseEffect

  // Methods
  const handleProduct = (id: number) => {
    navigate(`/products/${id}`);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form: FormData = new FormData(event.currentTarget);

    const newProduct = {
      id: Date.now(),
      name: form.get("name") as string,
      price: parseFloat(form.get("price") as string),
    };

    setProducts([...products, newProduct]);
    setOpenAdd(false);
  };

  return (
    <Container sx={{ padding: 0 }}>
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href='/home'>Accueil</Link>
        <Typography sx={{ color: 'text.primary' }}>Produits</Typography>
      </Breadcrumbs>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Typography variant="h3">Liste des produits</Typography>
        <IconButton color="primary" onClick={() => setOpenAdd(true)}>
          <AddCircleOutline />
        </IconButton>
      </Stack>
      <Drawer
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        anchor="right"
      >
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
          <TextField
            label="Prix"
            name="price"
            type="number"
            inputProps={{
              inputMode: "decimal",
              step: 0.01,
            }}
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
              <TableCell>Service</TableCell>
              <TableCell align="center">Prix (€)</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.name}</TableCell>
                <TableCell align="center">{service.price.toFixed(2)}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => handleProduct(service.id)}
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

export default Products;
