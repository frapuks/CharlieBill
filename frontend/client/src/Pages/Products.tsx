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
import { products } from "../Utils/ProductList";

const Products = () => {
  // Utils
  const navigate = useNavigate();
  const theme = useTheme();

  // Variables

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
