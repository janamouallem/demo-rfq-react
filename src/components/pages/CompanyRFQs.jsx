// CompanyRFQs.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/axios"
import {
  Typography, Table, TableHead, TableRow, TableCell, TableBody,
  Button, Paper, Stack
} from "@mui/material";


export default function CompanyRFQs() {
  const [rfqs, setRfqs] = useState([]);

  useEffect(() => {
    api.get("/rfqs?_sort=createdAt&_order=desc").then((r) => setRfqs(r.data));
  }, []);

  return (
    <Paper sx={{ p: 3, boxShadow: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h6" color="text.primary">Company RFQs</Typography>
        <Button variant="contained" component={Link} to="/company/rfqs/new">New RFQ</Button>
      </Stack>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>RFQ #</TableCell>
            <TableCell>Project</TableCell>
            <TableCell>Status</TableCell>
          
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rfqs.map((x) => (
            <TableRow key={x.id} hover>
              <TableCell>{x.id}</TableCell>
              <TableCell>{x.projectName}</TableCell>
              <TableCell>{x.status}</TableCell>
             
              <TableCell align="right">
                <Button size="small" variant="outlined" component={Link} to={`/company/rfqs/${x.id}/review`}>
                  Review
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}