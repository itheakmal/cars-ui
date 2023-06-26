import React from "react";
import {
  Grid,
  TextField,
} from "@mui/material";

// form field with error message
export const FormField = ({ label, type, inputProps, error }) => {
    return (
      <Grid item xs={12}>
        <TextField
          label={label}
          type={type}
          variant="outlined"
          fullWidth
          {...inputProps}
          error={!!error}
          helperText={error}
        />
      </Grid>
    );
  };