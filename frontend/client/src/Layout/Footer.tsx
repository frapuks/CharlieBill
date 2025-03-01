import { Mail } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      bgcolor="info.dark"
      sx={{ position: "sticky", top: "100%" }}
      padding={2}
      marginTop={5}
    >
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Typography variant="overline">Frapuks | 2025</Typography>
        <IconButton href="mailto:francoisgrunert@gmail.com">
          <Mail fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Footer;
