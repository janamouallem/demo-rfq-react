// Home.jsx
import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Stack alignItems="center" justifyContent="center" sx={{ mt: 8 }}>
      <Card sx={{ width: 700, bgcolor: "background.paper", boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom color="text.primary">
            Welcome to the RFQ System
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Manage construction material requests and supplier quotes efficiently.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="primary" component={Link} to="/company/rfqs/new">
              New RFQ
            </Button>
            <Button variant="outlined" color="secondary" component={Link} to="/company/rfqs">
              View RFQs
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
