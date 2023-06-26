import React from "react";
import {
  Grid,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
// select field with error message
export const FormSelect = ({ label, inputProps, error, options }) => {
    console.log('label', label)
    console.log('inputProps', inputProps)
    console.log('error', error)
    console.log('options', options)
    return (
      <Grid item xs={12}>
        <InputLabel id={`${label}-label`}>{label}</InputLabel>
        <Select
          labelId={`${label}-label`}
          variant="outlined"
          fullWidth
          {...inputProps}
          error={!!error}
          // helperText={error}
        >
          {options &&
            options.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
        </Select>
      </Grid>
    );
  };