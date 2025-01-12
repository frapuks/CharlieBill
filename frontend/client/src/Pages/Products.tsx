import { Edit } from "@mui/icons-material";
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

const Products = () => {
  // Utils
  const navigate = useNavigate();
  const theme = useTheme();

  // Variables
  const products = [
    { id: 1, name: "Effeuillage", price: 50.0 },
    { id: 2, name: "Pose de pavés", price: 120.0 },
    { id: 3, name: "Forage de puits", price: 300.0 },
    { id: 4, name: "Taille de haies", price: 70.0 },
    { id: 5, name: "Installation de clôture", price: 200.0 },
    { id: 6, name: "Nettoyage de terrasse", price: 80.0 },
    { id: 7, name: "Élagage d’arbres", price: 150.0 },
    { id: 8, name: "Aménagement de parterres", price: 180.0 },
    { id: 9, name: "Construction d’un muret", price: 250.0 },
    { id: 10, name: "Création d’un bassin", price: 400.0 },
  ];

  // UseEffect

  // Methods
  const handleEdit = (id: number) => {
    navigate(`/products/${id}`);
  };

  return (
    <Container sx={{ padding: 0 }}>
      <Typography variant="h5" textAlign={"center"}>
        Liste des produits
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: theme.palette.primary.light }}>
            <TableRow>
              <TableCell>
                <strong>Service</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Prix (€)</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Actions</strong>
              </TableCell>
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
                    onClick={() => handleEdit(service.id)}
                  >
                    <Edit />
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
