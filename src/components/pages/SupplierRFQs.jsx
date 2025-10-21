// SupplierRFQs.jsx
import { useEffect, useState } from "react";
import { api } from "../../api/axios"
import {
  Paper, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, Button
} from "@mui/material";
import { Link } from "react-router-dom";

export default function SupplierRFQs() {
  const [rfqs, setRfqs] = useState([]);

  useEffect(() => {
    api.get("/rfqs?supplierId=sup-01").then((r) => setRfqs(r.data));
  }, []);

  return (
    <Paper sx={{ p: 3, boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom>Supplier RFQs</Typography>
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
            <TableRow key={x.id}>
              <TableCell>{x.id}</TableCell>
              <TableCell>{x.projectName}</TableCell>
              <TableCell>{x.status}</TableCell>
              <TableCell align="right">
                <Button
                  component={Link}
                  to={`/supplier/rfqs/${x.id}`}
                  variant="outlined"
                  size="small"
                >
                  Open
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
