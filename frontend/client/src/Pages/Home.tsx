import {
  Typography,
  Container,
} from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
// import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Home = () => {
  // Utils
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const urlApi: string = import.meta.env.VITE_API_ROOT;

  // Variables

  // UseEffect
  useEffect(() => {
    // dataFetch();
  }, []);

  // Methods

  return (
    <Container sx={{ padding: 0 }}>
      <Typography variant="h5" textAlign={"center"}>
        Home
      </Typography>
    </Container>
  );
};

export default Home;
