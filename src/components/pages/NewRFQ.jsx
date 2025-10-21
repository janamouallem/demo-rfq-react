// src/pages/NewRFQ.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/axios";
import {
  Paper, Typography, TextField, Button, Stack,
  Table, TableHead, TableRow, TableCell, TableBody, IconButton
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

export default function NewRFQ() {
  const nav = useNavigate();

  // state
  const [projectName, setProjectName] = useState("");
  const [supplierId, setSupplierId] = useState("sup-01");
  const [items, setItems] = useState([
    { id: crypto.randomUUID(), name: "", unit: "", qty: 1, companyNote: "" }
  ]);
  const [submitted, setSubmitted] = useState(false);

  // helpers
  const addItem = () =>
    setItems((s) => [
      ...s,
      { id: crypto.randomUUID(), name: "", unit: "", qty: 1, companyNote: "" }
    ]);

  const updateItem = (i, patch) =>
    setItems((s) => s.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));

  const removeItem = (i) =>
    setItems((s) => {
      // keep at least one line
      if (s.length === 1) return s;
      return s.filter((_, idx) => idx !== i);
    });

  const validate = () => {
    if (!projectName.trim()) return false;
    if (!supplierId.trim()) return false;
    for (let it of items) {
      if (!it.name.trim() || !it.unit.trim() || !it.qty) return false;
    }
    return true;
  };

  const save = async () => {
    setSubmitted(true);
    if (!validate()) return; // stop if invalid

    const rfq = {
      id: `rfq-${Date.now()}`,
      projectName,
      supplierId,
      status: "SENT",
      createdBy: "company-01",
      createdAt: new Date().toISOString(),
      items: items.map((it) => ({
        ...it,
        supplierPrice: null,
        discountPct: null,
        supplierNote: null
      }))
    };

    await api.post("/rfqs", rfq);
    nav("/company/rfqs");
  };

  return (
    <Paper sx={{ p: 3, boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom color="text.primary">
        Create New RFQ
      </Typography>

      {/* Project Info */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          label="Project Name"
          fullWidth
          value={projectName}
          required
          onChange={(e) => setProjectName(e.target.value)}
          error={submitted && !projectName.trim()}
          helperText={
            submitted && !projectName.trim()
              ? "Project name is required"
              : " "
          }
        />
        <TextField
          label="Supplier ID"
          fullWidth
          value={supplierId}
          required
          onChange={(e) => setSupplierId(e.target.value)}
          error={submitted && !supplierId.trim()}
          helperText={
            submitted && !supplierId.trim()
              ? "Supplier ID is required"
              : " "
          }
        />
      </Stack>

      {/* Items Table */}
      <Table size="small" sx={{ mb: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Item Name</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Note</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((it, i) => (
            <TableRow key={it.id}>
              <TableCell>
                <TextField
                  size="small"
                  value={it.name}
                  onChange={(e) => updateItem(i, { name: e.target.value })}
                  error={submitted && !it.name.trim()}
                  helperText={
                    submitted && !it.name.trim()
                      ? "Item name is required"
                      : " "
                  }
                />
              </TableCell>

              <TableCell>
                <TextField
                  size="small"
                  value={it.unit}
                  onChange={(e) => updateItem(i, { unit: e.target.value })}
                  error={submitted && !it.unit.trim()}
                  helperText={
                    submitted && !it.unit.trim() ? "Unit is required" : " "
                  }
                />
              </TableCell>

              <TableCell>
                <TextField
                  size="small"
                  type="number"
                  value={it.qty}
                  onChange={(e) =>
                    updateItem(i, {
                      qty: parseFloat(e.target.value) || 0
                    })
                  }
                  error={submitted && (!it.qty || it.qty <= 0)}
                  helperText={
                    submitted && (!it.qty || it.qty <= 0)
                      ? "Quantity is required"
                      : " "
                  }
                />
              </TableCell>

              <TableCell>
                <TextField
                  size="small"
                  value={it.companyNote}
                  onChange={(e) =>
                    updateItem(i, { companyNote: e.target.value })
                  }
                  placeholder="Optional"
                  helperText=" "
                />
              </TableCell>

              <TableCell>
                <IconButton
                  color="error"
                  onClick={() => removeItem(i)}
                  disabled={items.length === 1} // disable delete on last row
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Action Buttons */}
      <Stack direction="row" spacing={2}>
        <Button
          startIcon={<Add />}
          onClick={addItem}
          variant="outlined"
          color="secondary"
        >
          Add Item
        </Button>
        <Button variant="contained" color="primary" onClick={save}>
          Save & Send
        </Button>
      </Stack>
    </Paper>
  );
}
