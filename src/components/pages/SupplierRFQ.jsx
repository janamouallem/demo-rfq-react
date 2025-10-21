// SupplierRFQ.jsx
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/axios"
import {
  Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody,
  TextField, Button, Stack
} from "@mui/material";

export default function SupplierRFQ() {
  const { id } = useParams();
  const [rfq, setRfq] = useState(null);

  useEffect(()=>{ api.get(`/rfqs/${id}`).then(r=>setRfq(r.data)); },[id]);

  const updateItem = (itemId,patch)=>{
    setRfq(r=>({...r,items:r.items.map(it=>it.id===itemId?{...it,...patch}:it)}));
  };

  const lineTotal = (it)=>{
    const price=parseFloat(it.supplierPrice||0);
    const disc=parseFloat(it.discountPct||0);
    return (price*(1-disc/100))*parseFloat(it.qty||0);
  };

  const grand = useMemo(()=> rfq?.items?.reduce((s,it)=>s+lineTotal(it),0)??0,[rfq]);

  const submitQuote = async()=>{
    if(rfq.items.some(it=>!it.supplierPrice)){
      alert("Please fill all prices before submitting.");
      return;
    }
    await api.put(`/rfqs/${rfq.id}`,{...rfq,status:"QUOTED"});
    alert("Quote submitted!");
  };

  if(!rfq) return <p>Loading…</p>;

  const isDisabled = rfq.status === "QUOTED" || rfq.status === "APPROVED";

  return (
    <Paper sx={{ p:3, boxShadow:3 }}>
      <Typography variant="h6" gutterBottom>Supplier Quote — {rfq.id}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb:2 }}>
        Project: {rfq.projectName} | Status: {rfq.status}
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Company Note</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Discount %</TableCell>
             
            <TableCell>Note</TableCell>
            <TableCell align="right">Line Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rfq.items.map(it=>(
            <TableRow key={it.id}>
              <TableCell>{it.name}</TableCell>
              <TableCell>{it.unit}</TableCell>
              <TableCell>{it.qty}</TableCell>
              <TableCell>
                {it.companyNote ?? "-"}
                 
              </TableCell>
              <TableCell>
                <TextField size="small" type="number"
                  value={it.supplierPrice ?? ''}
                  onChange={e=>updateItem(it.id,{supplierPrice:e.target.value})}/>
              </TableCell>
              <TableCell>
                <TextField size="small" type="number"
                  value={it.discountPct ?? ''}
                  onChange={e=>updateItem(it.id,{discountPct:e.target.value})}/>
              </TableCell>
               
              <TableCell>
                <TextField size="small"
                  value={it.supplierNote ?? ''}
                  onChange={e=>updateItem(it.id,{supplierNote:e.target.value})}/>
              </TableCell>
              <TableCell align="right">{lineTotal(it).toFixed(2)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={7} align="right"><b>Grand Total</b></TableCell>
            <TableCell align="right"><b>{grand.toFixed(2)}</b></TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Stack direction="row" justifyContent="flex-end" sx={{ mt:2 }}>
         <Button
          variant="contained"
          color={rfq.status === "QUOTED" ? "success" : "primary"}
          onClick={submitQuote}
          disabled={isDisabled} 
        >
          {rfq.status === "QUOTED"
            ? "Quote Submitted"
            : rfq.status === "APPROVED"
            ? "Approved — Locked"
            : "Submit Quote"}
        </Button>
      </Stack>
    </Paper>
  );
}