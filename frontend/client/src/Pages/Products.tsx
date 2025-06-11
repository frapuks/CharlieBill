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
  Link,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Product } from "../Types";
import { Loader } from "../Components";

const Products = () => {
  // Utils
  const navigate = useNavigate();
  const theme = useTheme();
  const urlApi: string = import.meta.env.VITE_API_ROOT;

  // Variables
  const [products, setProducts] = useState<Product[]>([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // UseEffect
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(`${urlApi}/products`);
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    };
    fetchData();
  }, []);

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
        <Link underline="hover" color="inherit" href="/home">
          Accueil
        </Link>
        <Typography sx={{ color: "text.primary" }}>Produits</Typography>
      </Breadcrumbs>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Typography variant="h3">Liste des produits</Typography>
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
            Ajouter un produit
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
            <Button variant="outlined" color="secondary" type="reset">
              Annuler
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Ajouter
            </Button>
          </Stack>
        </Box>
      </Drawer>

      {loading ? (
        <Loader />
      ) : (
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
                  <TableCell align="center">{service.price}</TableCell>
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
      )}
    </Container>
  );
};

export default Products;
