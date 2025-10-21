// ReviewRFQ.jsx
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/axios"

import {
  Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody,
  Button, Stack
} from "@mui/material";

export default function ReviewRFQ() {
  const { id } = useParams();
  const [rfq, setRfq] = useState(null);

  useEffect(()=>{ api.get(`/rfqs/${id}`).then(r=>setRfq(r.data)); },[id]);

  const lineTotal = (it)=> (parseFloat(it.supplierPrice||0)*(1-(parseFloat(it.discountPct||0)/100))*parseFloat(it.qty||0));
  const grand = useMemo(()=> rfq?.items?.reduce((s,it)=>s+lineTotal(it),0)??0,[rfq]);

  const markApproved = async()=>{
    await api.put(`/rfqs/${rfq.id}`,{...rfq,status:"APPROVED"});
    alert("RFQ marked as APPROVED");
  };

  if(!rfq) return <p>Loading…</p>;

  const isDisabled = rfq.status === "APPROVED" || rfq.status === "SENT";

  return (
    <Paper sx={{ p:3, boxShadow:3 }}>
      <Typography variant="h6" gutterBottom>Review — {rfq.id}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb:2 }}>
        Status: {rfq.status}
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Discount %</TableCell>
            <TableCell>Company Note</TableCell>
            <TableCell>Supplier Note</TableCell>
            <TableCell align="right">Line Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rfq.items.map(it=>(
            <TableRow key={it.id}>
              <TableCell>{it.name}</TableCell>
              <TableCell>{it.qty}</TableCell>
              <TableCell>{it.supplierPrice ?? "-"}</TableCell>
              <TableCell>{it.discountPct ?? "-"}</TableCell>
              <TableCell>{it.companyNote ?? "-"}</TableCell>
              <TableCell>{it.supplierNote ?? "-"}</TableCell>
              <TableCell align="right">{lineTotal(it).toFixed(2)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={6} align="right"><b>Grand Total</b></TableCell>
            <TableCell align="right"><b>{grand.toFixed(2)}</b></TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Stack direction="row" justifyContent="flex-end" sx={{ mt:2 }}>
         <Button
          variant="contained"
          color={rfq.status === "APPROVED" ? "success" : "primary"}
          onClick={markApproved}
          disabled={isDisabled} //disable if SENT or APPROVED
        >
          {rfq.status === "APPROVED"
            ? "Approved"
            : rfq.status === "SENT"
            ? "Awaiting Supplier"
            : "Mark as APPROVED"}
        </Button>
      </Stack>
    </Paper>
  );
}