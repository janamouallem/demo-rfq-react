// src/pages/Home.jsx
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { api } from "../../api/axios";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

export default function Home() {
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/rfqs").then((res) => {
      setRfqs(res.data || []);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ mt: 8 }}>
        <CircularProgress />
      </Stack>
    );

  // ✅ Compute analytics
  const total = rfqs.length;
  const sent = rfqs.filter((r) => r.status === "SENT").length;
  const quoted = rfqs.filter((r) => r.status === "QUOTED").length;
  const approved = rfqs.filter((r) => r.status === "APPROVED").length;

  const data = [
    { name: "Sent", value: sent },
    { name: "Quoted", value: quoted },
    { name: "Approved", value: approved },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom color="text.primary">
        Dashboard
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Overview of RFQs and supplier activity.
      </Typography>

      <Grid container spacing={2}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ boxShadow: 3, bgcolor: "#f5f5f5" }}>
            <CardContent>
              <Typography variant="h6">Total RFQs</Typography>
              <Typography variant="h4" color="primary">
                {total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ boxShadow: 3, bgcolor: "#f5f5f5" }}>
            <CardContent>
              <Typography variant="h6">Quoted</Typography>
              <Typography variant="h4" color="secondary">
                {quoted}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ boxShadow: 3, bgcolor: "#f5f5f5" }}>
            <CardContent>
              <Typography variant="h6">Approved</Typography>
              <Typography variant="h4" color="success.main">
                {approved}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Actions */}
      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/company/rfqs/new"
        >
          New RFQ
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          component={Link}
          to="/company/rfqs"
        >
          View RFQs
        </Button>
      </Stack>
    </Box>
  );
}
