import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

export default function InputTextSearch(props) {
  return (
    <Box style={{
        margin: 10,
        width: 600
    }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField 
            label={props.label} 
            variant="standard" 
            {...props}
            style={{
                flex: 1,
            }}
        />
      </Box>
    </Box>
  );
}
