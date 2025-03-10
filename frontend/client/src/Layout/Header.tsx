import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { AccountCircle, Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  // Utils
  const navigate = useNavigate();

  // Variables
  const accessToken = localStorage.getItem("accessToken");

  // Methods
  const handleClickIcon = (): void => {
    if (accessToken) navigate("/home");
  };
  const handleClickLogin = (): void => {
    navigate("/login");
  };
  const handleClickDashboard = (): void => {
    navigate("/home");
  };
  const handleClickAccount = (): void => {
    navigate("/account");
  };

  return (
    <AppBar component="header" position="static" sx={{marginBottom: 1}}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={handleClickIcon}>
          <Home />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Charlie Bill
        </Typography>
        {accessToken ? (
          <>
            <Button color="inherit" onClick={handleClickDashboard}>
              Accueil
            </Button>
            <IconButton color="inherit" onClick={handleClickAccount}>
              <AccountCircle />
            </IconButton>
          </>
        ) : (
          <Button color="inherit" onClick={handleClickLogin}>
            Se connecter
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
