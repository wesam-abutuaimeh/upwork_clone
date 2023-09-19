import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box, TextField, Typography } from "@mui/material";
import { StyledButton, StyledSearchedKeys } from "./style";

const Searchbar = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: "25px",
          margin: "20px auto 10px",
        }}
      >
        <TextField
          id="search"
          label="Search for job"
          variant="outlined"
          fullWidth
        />
        <StyledButton>
          <SearchIcon />
        </StyledButton>
      </Box>
      <Typography variant="body1" display="block" sx={{ marginBottom: "20px" }}>
        Recent Searches:
        <StyledSearchedKeys>frontend, react , full stack </StyledSearchedKeys>
      </Typography>
    </Box>
  );
};

export default Searchbar;
