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
  IconButton,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { Params, useNavigate, useParams } from "react-router-dom";
import { products } from "../Utils/ProductList";
import { useEffect, useState } from "react";
import type { Product as ProductType } from "../Types";
import { Delete, Edit } from "@mui/icons-material";
import { DeleteDialog } from "../Components";

const Product = () => {
  // Utils
  const navigate = useNavigate();
  const { productId } = useParams<Params>();

  // Variables
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

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
      price: parseFloat(form.get("price") as string),
    };
    setProduct(newProduct);
    setOpenDrawer(false);
  };

  const handleConfirmDelete = () => {
    setOpenDelete(false);
    navigate("/products");
  };

  return (
    <Container sx={{ padding: 0 }}>
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/home">
          Accueil
        </Link>
        <Link underline="hover" color="inherit" href="/products">
          Produits
        </Link>
        <Typography sx={{ color: "text.primary" }}>{product.name}</Typography>
      </Breadcrumbs>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Typography variant="h3">{product.name}</Typography>
        <IconButton color="primary" onClick={() => setOpenDrawer(true)}>
          <Edit />
        </IconButton>
      </Stack>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <Typography>Nom : </Typography>
          <Typography>{product.name}</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography>Prix : </Typography>
          <Typography>{product.price.toFixed(2) + " €"}</Typography>
        </Stack>
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
            margin: "2em 2em",
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
              Sauvegarder
            </Button>
          </Stack>
          <Divider />
          <Button
            variant="contained"
            color="error"
            startIcon={<Delete />}
            size="small"
            onClick={() => setOpenDelete(true)}
          >
            Supprimer le produit
          </Button>
        </Box>
        <DeleteDialog
          open={openDelete}
          handleClose={() => setOpenDelete(false)}
          handleConfirm={handleConfirmDelete}
        />
      </Drawer>
    </Container>
  );
};

export default Product;
