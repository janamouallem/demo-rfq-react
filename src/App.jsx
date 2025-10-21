// src/App.jsx
import { AppBar, Toolbar, Typography, Container, Box, Button } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            🏗️ Construction RFQ
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/company/rfqs">Company</Button>
          <Button color="inherit" component={Link} to="/supplier/rfqs">Supplier</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4, mb: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
