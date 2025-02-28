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
} from "@mui/material";
import { Params, useParams } from "react-router-dom";
import { products } from "../Utils/ProductList";
import { useEffect, useState } from "react";
import type { Product } from "../Types";

const Product = () => {
  // Utils
  const { productId } = useParams<Params>();

  // Variables
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [openDrawer, setOpenDrawer] = useState(false);

  // UseEffect
  useEffect(() => {
    setLoading(true);
    const currentProduct = products.find(
      (elem) => elem.id === parseInt(productId ?? "")
    );
    if (!currentProduct) {
      setError("Aucun produit trouvé.");
    } else {
      setProduct(currentProduct);
    }
    setLoading(false);
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

  if (!product) {
    return <Typography>Aucun produit trouvé.</Typography>;
  }

  // Methods
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form: FormData = new FormData(event.currentTarget);
    const newProduct = {
      id: product.id,
      name: form.get("name") as string,
      price: parseInt(form.get("price") as string),
    };
    setProduct(newProduct);
    console.log("Produit mis à jour :", newProduct);
    setOpenDrawer(false);
  };

  return (
    <Container sx={{ padding: 0 }}>
      <Typography variant="h5" textAlign={"center"}>
        {product.name}
      </Typography>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <Typography>Nom : </Typography>
          <Typography>{product.name}</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography>Prix : </Typography>
          <Typography>{product.price.toFixed(2) + " €"}</Typography>
        </Stack>
        <Button
          variant="outlined"
          sx={{ alignSelf: "center" }}
          onClick={() => setOpenDrawer(true)}
        >
          Modifier
        </Button>
      </Stack>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        anchor="right"
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          onReset={() => setOpenDrawer(false)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            margin: "2em 4em",
          }}
        >
          <Typography variant="h5" textAlign="center">
            Modifier le Produit
          </Typography>
          <Divider />
          <TextField
            label="Nom"
            name="name"
            defaultValue={product.name}
            required
          />
          <TextField
            label="Prix"
            name="price"
            type="number"
            defaultValue={product.price}
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
    </Container>
  );
};

export default Product;
