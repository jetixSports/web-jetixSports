import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { Typography, Link } from "@mui/material";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function ColorCheckboxes({ checked, onChange }: { checked: boolean, onChange: (e: any) => any }) {
  return (
    <div>
      <Checkbox {...label} checked={checked} onChange={onChange} color="secondary" />

    </div>
  );
}