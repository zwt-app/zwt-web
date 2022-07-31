import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function UserProfile() {
  return (
    <Stack direction="row" spacing={2} flexDirection='row' justifyContent={'center'} alignItems={'center'}>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" style={{margin: 20}}/>
      <Stack>
        <span>Remy Sharp</span>
        <span style={{fontSize: 14, color: 'grey'}}>Pratico</span>
      </Stack>
    </Stack>
  );
}